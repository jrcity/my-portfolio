import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      select: { views: true, likes: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const cookieName = `liked_${params.slug}`
    const liked = req.cookies.has(cookieName)

    return NextResponse.json({ views: post.views, likes: post.likes, liked })
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
