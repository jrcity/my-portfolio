import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { getPost, getPostMetas, formatDate, readingTime } from '@/lib/blog'

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://redemption-chi.vercel.app'
  : 'http://localhost:3000'

export function generateStaticParams() {
  return getPostMetas().map((post) => ({
    slug: post.slug,
  }))
}

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
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-20 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
              {post.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.date)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readingTime(post.contentHtml)}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {post.tags.join(' · ')}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white">
              {post.title}
            </h1>
            <p className="text-lg text-gray-400 mt-4 leading-relaxed">
              {post.description}
            </p>
          </header>

          <div
            className="blog-content text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </div>
    </div>
  )
}
