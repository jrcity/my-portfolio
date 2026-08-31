import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.post.update({
      where: { slug: params.slug },
      data: { views: { increment: 1 } },
      select: { views: true },
    })
    return NextResponse.json({ views: post.views })
  } catch {
    // Unknown slug or transient DB error — a failed view count is not worth a 500
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
