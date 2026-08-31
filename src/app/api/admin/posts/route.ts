import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminPosts, slugify } from '@/lib/blog'

export async function GET() {
  try {
    const posts = await getAdminPosts()
    return NextResponse.json({ posts })
  } catch {
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)

    const title = typeof body?.title === 'string' ? body.title.trim() : ''
    const description = typeof body?.description === 'string' ? body.description.trim() : ''
    const content = typeof body?.content === 'string' ? body.content : ''
    const slug = typeof body?.slug === 'string' && body.slug.trim()
      ? slugify(body.slug)
      : slugify(title)
    const tags = Array.isArray(body?.tags)
      ? body.tags.filter((t: unknown) => typeof t === 'string').slice(0, 10)
      : typeof body?.tags === 'string'
        ? body.tags.split(',').map((t: string) => t.trim()).filter(Boolean).slice(0, 10)
        : []
    const published = Boolean(body?.published)

    if (!title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
    }
    if (!slug) {
      return NextResponse.json({ error: 'Could not derive a slug from the title.' }, { status: 400 })
    }
    if (!content.trim()) {
      return NextResponse.json({ error: 'Content is required.' }, { status: 400 })
    }

    const existing = await prisma.post.findUnique({ where: { slug }, select: { id: true } })
    if (existing) {
      return NextResponse.json({ error: `Slug "${slug}" is already in use.` }, { status: 409 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        description: description || title,
        content,
        tags,
        published,
        publishedAt: published ? new Date() : null,
      },
      select: { id: true, slug: true, title: true, published: true },
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
