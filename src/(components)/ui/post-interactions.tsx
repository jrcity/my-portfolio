'use client'

import { useEffect, useState, useCallback } from 'react'
import useSWR from 'swr'
import { Eye, Heart, Loader2, MessageCircle, Send } from 'lucide-react'

interface CommentItem {
  id: string
  author: string
  body: string
  createdAt: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function timeAgo(isoDate: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function PostInteractions({ slug }: { slug: string }) {
  const [stats, setStats] = useState<{ views: number; likes: number } | null>(null)
  const [liked, setLiked] = useState(false)
  const [likePending, setLikePending] = useState(false)

  const { data: commentsData, mutate: mutateComments } = useSWR<{ comments: CommentItem[] }>(
    `/api/blog/${slug}/comments`,
    fetcher
  )

  // Load stats + whether this browser already liked the post
  useEffect(() => {
    fetch(`/api/blog/${slug}/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats({ views: data.views ?? 0, likes: data.likes ?? 0 })
        setLiked(Boolean(data.liked))
      })
      .catch(() => setStats({ views: 0, likes: 0 }))

    // Count a view once per session per post
    const key = `viewed_${slug}`
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1')
      fetch(`/api/blog/${slug}/view`, { method: 'POST' }).catch(() => {})
    }
  }, [slug])

  const toggleLike = useCallback(async () => {
    if (likePending) return
    setLikePending(true)
    try {
      const res = await fetch(`/api/blog/${slug}/like`, { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setLiked(Boolean(data.liked))
        setStats((s) => (s ? { ...s, likes: data.likes } : s))
      }
    } catch {
      // Network hiccup — leave state as-is
    } finally {
      setLikePending(false)
    }
  }, [slug, likePending])

  return (
    <div className="mt-14 pt-8 border-t border-gray-800">
      {/* Views + likes */}
      <div className="flex items-center gap-6">
        <span className="flex items-center gap-2 text-sm text-gray-400">
          <Eye className="w-4 h-4" />
          {stats ? `${stats.views.toLocaleString()} views` : '—'}
        </span>
        <button
          onClick={toggleLike}
          disabled={!stats || likePending}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike this post' : 'Like this post'}
          className={`flex items-center gap-2 text-sm transition-colors ${
            liked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          {stats ? stats.likes.toLocaleString() : '—'}
          <span className="sr-only">likes</span>
        </button>
      </div>

      {/* Comments */}
      <div className="mt-10">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">
          <MessageCircle className="w-4 h-4" />
          Comments
          {commentsData?.comments && (
            <span className="text-gray-600 normal-case font-normal">
              ({commentsData.comments.length})
            </span>
          )}
        </h2>

        <CommentForm slug={slug} onPosted={() => mutateComments()} />

        <div className="mt-8 grid gap-4">
          {commentsData?.comments?.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-800/40 border border-gray-700/40 rounded-xl p-5"
            >
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <span className="text-sm font-semibold text-purple-300">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-500">{timeAgo(comment.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {comment.body}
              </p>
            </div>
          ))}
          {commentsData && commentsData.comments?.length === 0 && (
            <p className="text-sm text-gray-500">
              No comments yet — start the conversation.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function CommentForm({ slug, onPosted }: { slug: string; onPosted: () => void }) {
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)

    try {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, body }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
      } else {
        setBody('')
        onPosted()
      }
    } catch {
      setError('Network error — try again')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div className="grid sm:grid-cols-[200px_1fr] gap-3">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          maxLength={80}
          required
          className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your thoughts…"
          maxLength={2000}
          required
          className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Post comment
        </button>
      </div>
    </form>
  )
}
