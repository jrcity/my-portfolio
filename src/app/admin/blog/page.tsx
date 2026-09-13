'use client'

import { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import {
  ArrowLeft,
  Eye,
  Heart,
  Loader2,
  MessageCircle,
  Pencil,
  Plus,
  Rocket,
  Save,
  Trash2,
  X,
} from 'lucide-react'
import type { AdminPost } from '@/lib/blog'
import { TiptapEditor } from '@/(components)/ui/TiptapEditor'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface EditorState {
  id: string | null
  title: string
  slug: string
  description: string
  tags: string
  content: string
  published: boolean
}

const EMPTY_EDITOR: EditorState = {
  id: null,
  title: '',
  slug: '',
  description: '',
  tags: '',
  content: '',
  published: false,
}

export default function AdminBlogPage() {
  const { data, mutate, isLoading } = useSWR<{ posts: AdminPost[] }>(
    '/api/admin/posts',
    fetcher
  )
  const [editor, setEditor] = useState<EditorState | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const posts = data?.posts ?? []

  const startNew = () => {
    setError(null)
    setEditor({ ...EMPTY_EDITOR })
  }

  const startEdit = (post: AdminPost) => {
    setError(null)
    setEditor({
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      tags: post.tags.join(', '),
      content: post.content,
      published: post.published,
    })
  }

  const save = async () => {
    if (!editor || saving) return
    setSaving(true)
    setError(null)

    try {
      const payload = {
        title: editor.title,
        slug: editor.slug || editor.title,
        description: editor.description,
        tags: editor.tags,
        content: editor.content,
        published: editor.published,
      }

      const res = editor.id
        ? await fetch(`/api/admin/posts/${editor.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/admin/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error ?? 'Failed to save')
      } else {
        setEditor(null)
        mutate()
      }
    } catch {
      setError('Network error — try again')
    } finally {
      setSaving(false)
    }
  }

  const togglePublish = useCallback(
    async (post: AdminPost) => {
      await fetch(`/api/admin/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      })
      mutate()
    },
    [mutate]
  )

  const remove = useCallback(
    async (post: AdminPost) => {
      if (!window.confirm(`Delete "${post.title}" and all its comments? This cannot be undone.`)) {
        return
      }
      await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' })
      mutate()
    },
    [mutate]
  )

  return (
    <div className="min-h-screen bg-gray-900 pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Admin home
            </Link>
            <h1 className="text-3xl font-bold text-gradient">Blog Manager</h1>
          </div>
          <button
            onClick={startNew}
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            New post
          </button>
        </div>

        {/* Editor */}
        {editor && (
          <div className="mb-10 bg-gray-900 border border-purple-500/30 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">
                {editor.id ? 'Edit post' : 'New post'}
              </h2>
              <button
                onClick={() => setEditor(null)}
                aria-label="Close editor"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-4">
              <Field label="Title">
                <input
                  value={editor.title}
                  onChange={(e) =>
                    setEditor({
                      ...editor,
                      // Auto-fill the slug while it is untouched
                      slug: editor.id || editor.slug ? editor.slug : e.target.value,
                      title: e.target.value,
                    })
                  }
                  placeholder="Designing RBAC That Survives Reality"
                  className={inputClass}
                />
              </Field>

              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Slug" hint="/blog/…">
                  <input
                    value={editor.slug}
                    onChange={(e) => setEditor({ ...editor, slug: e.target.value })}
                    placeholder="rbac-that-survives-reality"
                    className={`${inputClass} font-mono text-sm`}
                  />
                </Field>
                <Field label="Tags" hint="comma-separated">
                  <input
                    value={editor.tags}
                    onChange={(e) => setEditor({ ...editor, tags: e.target.value })}
                    placeholder="Architecture, Security, Node.js"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Description" hint="used for meta tags and previews">
                <textarea
                  value={editor.description}
                  onChange={(e) => setEditor({ ...editor, description: e.target.value })}
                  rows={2}
                  placeholder="A one-to-two sentence summary of the post."
                  className={inputClass}
                />
              </Field>

              <Field label="Content" hint="markdown">
                <textarea
                  value={editor.content}
                  onChange={(e) => setEditor({ ...editor, content: e.target.value })}
                  rows={16}
                  placeholder={'## A section heading\n\nWrite your post in **markdown**…'}
                  className={`${inputClass} font-mono text-sm leading-relaxed custom-scrollbar`}
                />
              </Field>

              <label className="flex items-center gap-3 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={editor.published}
                  onChange={(e) => setEditor({ ...editor, published: e.target.checked })}
                  className="w-4 h-4 accent-purple-500"
                />
                Publish immediately (uncheck to save as draft)
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div className="flex items-center gap-3">
                <button
                  onClick={save}
                  disabled={saving || !editor.title.trim() || !editor.content.trim()}
                  className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editor.id ? 'Save changes' : 'Create post'}
                </button>
                <button
                  onClick={() => setEditor(null)}
                  className="px-5 py-2.5 rounded-lg text-sm text-gray-400 hover:text-gray-200 border border-gray-700/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Post list */}
        <div className="grid gap-3">
          {isLoading && (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          )}

          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-wrap items-center gap-4 bg-gray-900 border border-gray-700/40 rounded-xl p-5 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex-1 min-w-[240px]">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-white">{post.title}</span>
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      post.published
                        ? 'text-green-400 border-green-500/30 bg-green-500/10'
                        : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="font-mono">/blog/{post.slug}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {post.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" /> {post.comments}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePublish(post)}
                  title={post.published ? 'Unpublish' : 'Publish'}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 border border-gray-700/50 hover:border-purple-500/40 hover:text-purple-300 transition-colors"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => startEdit(post)}
                  title="Edit"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 border border-gray-700/50 hover:border-purple-500/40 hover:text-purple-300 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => remove(post)}
                  title="Delete"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 border border-gray-700/50 hover:border-red-500/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {!isLoading && posts.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              No posts yet — create your first one.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const inputClass =
  'w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50'

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
        {hint && <span className="ml-2 normal-case font-normal text-gray-600">({hint})</span>}
      </span>
      {children}
    </label>
  )
}
