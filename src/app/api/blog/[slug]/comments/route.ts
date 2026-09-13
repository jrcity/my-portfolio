import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Basic in-memory throttle: one comment per IP per minute
const lastCommentAt = new Map<string, number>()

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      select: { id: true, published: true },
    })

    if (!post || !post.published) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const comments = await prisma.comment.findMany({
      where: { postId: post.id },
      orderBy: { createdAt: 'desc' },
      select: { id: true, author: true, body: true, createdAt: true },
    })

    return NextResponse.json({ comments })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      select: { id: true, published: true },
    })

    if (!post || !post.published) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    const now = Date.now()
    if (now - (lastCommentAt.get(ip) ?? 0) < 60_000) {
      return NextResponse.json(
        { error: 'You are commenting too quickly — wait a moment.' },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)
    const author = typeof body?.author === 'string' ? body.author.trim() : ''
    const text = typeof body?.body === 'string' ? body.body.trim() : ''

    if (!author || author.length > 80) {
      return NextResponse.json({ error: 'Name is required (max 80 characters).' }, { status: 400 })
    }
    if (!text || text.length > 2000) {
      return NextResponse.json({ error: 'Comment is required (max 2000 characters).' }, { status: 400 })
    }

    const comment = await prisma.comment.create({
      data: { postId: post.id, author, body: text },
      select: { id: true, author: true, body: true, createdAt: true },
    })

    lastCommentAt.set(ip, now)

    return NextResponse.json({ comment }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
