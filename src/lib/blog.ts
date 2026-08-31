import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
}

export interface Post extends PostMeta {
  contentHtml: string
}

export function getPostMetas(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'))

  return fileNames
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const { data } = matter(fs.readFileSync(fullPath, 'utf8'))

      return {
        slug: fileName.replace(/\.md$/, ''),
        title: data.title ?? fileName,
        description: data.description ?? '',
        date: data.date ? new Date(data.date).toISOString() : '',
        tags: data.tags ?? [],
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  const processed = await remark().use(html).process(content)

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ? new Date(data.date).toISOString() : '',
    tags: data.tags ?? [],
    contentHtml: processed.toString(),
  }
}

export function formatDate(isoDate: string): string {
  if (!isoDate) return ''
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function readingTime(contentHtml: string): string {
  const words = contentHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.round(words / 200))} min read`
}
