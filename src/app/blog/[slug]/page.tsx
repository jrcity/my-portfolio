import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { getPost, formatDate, readingTime } from '@/lib/blog'
import { PostInteractions } from '@/(components)/ui/post-interactions'
import { ShareButtons } from '@/(components)/ui/share-buttons'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://redemption-chi.vercel.app'
  : 'http://localhost:3000'

// Views/likes/comments change per request — render dynamically
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      url: `${baseUrl}/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${baseUrl}/blog/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Redemption Jonathan',
      url: baseUrl,
    },
    keywords: post.tags.join(', '),
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ViewAction',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-20 pt-32 prose dark:prose-invert max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose dark:prose-invert max-w-none">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8 prose dark:prose-invert max-w-none"
        >
          <ArrowLeft className="w-4 h-4 prose dark:prose-invert max-w-none" />
          All articles
        </Link>

        <article>
          <header className="mb-10 prose dark:prose-invert max-w-none">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4 prose dark:prose-invert max-w-none">
              {post.date && (
                <span className="flex items-center gap-1.5 prose dark:prose-invert max-w-none">
                  <Calendar className="w-3.5 h-3.5 prose dark:prose-invert max-w-none" />
                  {formatDate(post.date)}
                </span>
              )}
              <span className="flex items-center gap-1.5 prose dark:prose-invert max-w-none">
                <Clock className="w-3.5 h-3.5 prose dark:prose-invert max-w-none" />
                {readingTime(post.contentHtml)}
              </span>
              {post.tags.length > 0 && (
                <span className="flex items-center gap-1.5 prose dark:prose-invert max-w-none">
                  <Tag className="w-3.5 h-3.5 prose dark:prose-invert max-w-none" />
                  {post.tags.join(' · ')}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white prose dark:prose-invert max-w-none">
              {post.title}
            </h1>
            <p className="text-lg text-gray-400 mt-4 leading-relaxed prose dark:prose-invert max-w-none">
              {post.description}
            </p>
            <div className="mt-6 prose dark:prose-invert max-w-none">
              <ShareButtons slug={post.slug} title={post.title} />
            </div>
          </header>

          <div
            className="blog-content text-gray-300 prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <PostInteractions slug={post.slug} />
        </article>
      </div>
    </div>
  )
}
