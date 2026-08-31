import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { getPostMetas, formatDate } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — Writing on Architecture & Engineering',
  description:
    'Essays and technical write-ups on software architecture, system design, and the engineering decisions behind real production systems, by Redemption Jonathan.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogIndex() {
  const posts = getPostMetas()

  return (
    <div className="min-h-screen bg-gray-900 pb-20 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <header className="mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">
            Writing
          </h1>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl">
            Essays on architecture, system design, and the decisions behind the
            systems I build. Less tutorial, more trade-offs.
          </p>
        </header>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-gray-900 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all shadow-lg hover:shadow-purple-500/5"
            >
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                {post.date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.date)}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" />
                  {post.tags.join(' · ')}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                {post.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm text-purple-400 mt-4 group-hover:gap-2.5 transition-all">
                Read article
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
