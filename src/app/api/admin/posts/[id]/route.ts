import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/blog'

function parseTags(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.filter((t) => typeof t === 'string').slice(0, 10)
  }
  if (typeof input === 'string') {
    return input.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 10)
  }
  return []
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existing = await prisma.post.findUnique({
      where: { id: params.id },
      select: { id: true, published: true, publishedAt: true, slug: true },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const body = await req.json().catch(() => ({}))

    const data: Record<string, unknown> = {}

    if (typeof body?.title === 'string' && body.title.trim()) data.title = body.title.trim()
    if (typeof body?.description === 'string') data.description = body.description.trim()
    if (typeof body?.content === 'string') data.content = body.content
    if (body?.tags !== undefined) data.tags = parseTags(body.tags)

    if (typeof body?.slug === 'string' && body.slug.trim()) {
      const slug = slugify(body.slug)
      if (slug !== existing.slug) {
        const clash = await prisma.post.findUnique({ where: { slug }, select: { id: true } })
        if (clash) {
          return NextResponse.json({ error: `Slug "${slug}" is already in use.` }, { status: 409 })
        }
        data.slug = slug
      }
    }

    if (typeof body?.published === 'boolean') {
      data.published = body.published
      // Set publishedAt on first publish; keep the original date afterwards
      if (body.published && !existing.publishedAt) {
        data.publishedAt = new Date()
      }
    }

    const post = await prisma.post.update({
      where: { id: params.id },
      data,
      select: { id: true, slug: true, title: true, published: true },
    })

    return NextResponse.json({ post })
  } catch {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.post.delete({ where: { id: params.id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
