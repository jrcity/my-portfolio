// One-off seed: imports the markdown posts in src/content/blog into the
// Neon Post table. Safe to re-run — existing slugs are skipped.
//
// Usage: node scripts/seed-blog.mjs
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// Minimal .env loader (DATABASE_URL)
const envPath = path.join(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$/)
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2]
    }
  }
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set')
  process.exit(1)
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })

async function main() {
  const postsDir = path.join(process.cwd(), 'src/content/blog')
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))

  for (const file of files) {
    const { data, content } = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'))
    const slug = file.replace(/\.md$/, '')

    const existing = await prisma.post.findUnique({ where: { slug }, select: { id: true } })
    if (existing) {
      console.log(`⏭  ${slug} — already exists, skipping`)
      continue
    }

    await prisma.post.create({
      data: {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        content,
        tags: data.tags ?? [],
        published: true,
        publishedAt: data.date ? new Date(data.date) : new Date(),
      },
    })
    console.log(`✅ ${slug} — imported`)
  }
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
