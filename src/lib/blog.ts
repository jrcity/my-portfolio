import { remark } from 'remark'
import html from 'remark-html'
import { prisma } from '@/lib/prisma'

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

export interface AdminPost {
  id: string
  slug: string
  title: string
  description: string
  content: string
  tags: string[]
  published: boolean
  publishedAt: string | null
  views: number
  likes: number
  comments: number
  createdAt: string
}

// Published posts, newest first. Fail-safe so a cold/unreachable database
// never breaks rendering of the site.
export async function getPostMetas(options?: { includeDrafts?: boolean }): Promise<PostMeta[]> {
  try {
    const posts = await prisma.post.findMany({
      where: options?.includeDrafts ? undefined : { published: true },
      orderBy: { publishedAt: 'desc' },
      select: { slug: true, title: true, description: true, publishedAt: true, createdAt: true, tags: true },
    })

    return posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: (post.publishedAt ?? post.createdAt).toISOString(),
      tags: post.tags,
    }))
  } catch {
    return []
  }
}

export async function getPost(slug: string, options?: { includeDrafts?: boolean }): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
    })

    if (!post) return null
    if (!post.published && !options?.includeDrafts) return null

    const processed = await remark().use(html).process(post.content)

    return {
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: (post.publishedAt ?? post.createdAt).toISOString(),
      tags: post.tags,
      contentHtml: processed.toString(),
    }
  } catch {
    return null
  }
}

export async function getAdminPosts(): Promise<AdminPost[]> {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { comments: true } } },
  })

  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    tags: post.tags,
    published: post.published,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    views: post.views,
    likes: post.likes,
    comments: post._count.comments,
    createdAt: post.createdAt.toISOString(),
  }))
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
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
