import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const COOKIE_PREFIX = 'liked_'
const ONE_YEAR = 60 * 60 * 24 * 365

// Toggles the like for this browser, tracked via a long-lived cookie so
// likes are one-per-reader without requiring accounts.
export async function POST(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const cookieName = `${COOKIE_PREFIX}${params.slug}`

  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      select: { id: true, likes: true, published: true },
    })

    if (!post || !post.published) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const cookieHeader = _req.headers.get('cookie') ?? ''
    const alreadyLiked = cookieHeader
      .split(';')
      .map((c) => c.trim())
      .some((c) => c.startsWith(`${cookieName}=`))

    const updated = await prisma.post.update({
      where: { id: post.id },
      data: { likes: alreadyLiked ? { decrement: 1 } : { increment: 1 } },
      select: { likes: true },
    })

    const response = NextResponse.json({
      likes: Math.max(0, updated.likes),
      liked: !alreadyLiked,
    })

    if (alreadyLiked) {
      response.cookies.delete(cookieName)
    } else {
      response.cookies.set(cookieName, '1', {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: ONE_YEAR,
        path: '/',
      })
    }

    return response
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
