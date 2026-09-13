'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { useTheme } from 'next-themes'
import {
  Command,
  FileText,
  Home,
  User,
  Briefcase,
  PenTool,
  Mail,
  Search,
  Sun,
  Moon,
} from 'lucide-react'
import { privateProjects } from '@/constants/projects'

interface PaletteItem {
  id: string
  label: string
  hint: string
  href: string
  icon: React.ReactNode
  keywords: string
}

interface CommandPaletteProps {
  posts: { slug: string; title: string; tags: string[] }[]
}

export function CommandPalette({ posts }: CommandPaletteProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // ⌘K / Ctrl+K to open, / when not typing
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === '/' && !isTyping(e.target)) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const items = useMemo<PaletteItem[]>(() => {
    const nav: PaletteItem[] = [
      { id: 'home', label: 'Home', hint: 'Page', href: '/#home', icon: <Home className="w-4 h-4" />, keywords: 'home landing start' },
      { id: 'about', label: 'About', hint: 'Page', href: '/#about', icon: <User className="w-4 h-4" />, keywords: 'about bio skills experience' },
      { id: 'projects', label: 'Projects', hint: 'Page', href: '/#projects', icon: <Briefcase className="w-4 h-4" />, keywords: 'projects work portfolio' },
      { id: 'blog', label: 'Blog', hint: 'Page', href: '/blog', icon: <PenTool className="w-4 h-4" />, keywords: 'blog writing articles posts rss' },
      { id: 'contact', label: 'Contact', hint: 'Page', href: '/#contact', icon: <Mail className="w-4 h-4" />, keywords: 'contact email hire message' },
    ]

    const projects: PaletteItem[] = privateProjects
      .filter((p) => p.caseStudy || p.architecture)
      .map((p) => ({
        id: `project-${p.id}`,
        label: p.title,
        hint: 'Case Study',
        href: `/projects/${p.id}`,
        icon: <FileText className="w-4 h-4" />,
        keywords: [p.title, ...p.stack, ...p.tags].join(' ').toLowerCase(),
      }))

    const blogPosts: PaletteItem[] = posts.map((p) => ({
      id: `post-${p.slug}`,
      label: p.title,
      hint: 'Article',
      href: `/blog/${p.slug}`,
      icon: <PenTool className="w-4 h-4" />,
      keywords: [p.title, ...p.tags].join(' ').toLowerCase(),
    }))

    return [...nav, ...projects, ...blogPosts]
  }, [posts])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.keywords.includes(q)
    )
  }, [items, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      // Focus the input after the dialog mounts
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const go = useCallback(
    (href: string) => {
      setOpen(false)
      router.push(href)
    },
    [router]
  )

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = filtered[activeIndex]
      if (item) go(item.href)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-[18%] z-[101] w-[92vw] max-w-lg -translate-x-1/2 rounded-2xl border border-purple-500/30 bg-gray-900 shadow-2xl shadow-purple-500/10 focus:outline-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-gray-700/50 px-4 py-3">
            <Search className="w-4 h-4 text-purple-400 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search projects, articles, pages…"
              className="w-full bg-transparent text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none"
              aria-label="Search the site"
            />
            <kbd className="hidden sm:block rounded border border-gray-700 bg-gray-800 px-1.5 py-0.5 text-[10px] font-mono text-gray-500">
              ESC
            </kbd>
          </div>

          <div className="custom-scrollbar max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 && (
              <p className="px-3 py-8 text-center text-sm text-gray-500">
                No results for &quot;{query}&quot;
              </p>
            )}
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => go(item.href)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  idx === activeIndex
                    ? 'bg-purple-500/15 text-purple-200'
                    : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <span className={idx === activeIndex ? 'text-purple-400' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                <span className="text-[10px] uppercase tracking-wider text-gray-500">
                  {item.hint}
                </span>
              </button>
            ))}

            {/* Theme toggle always available at the bottom */}
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
                setOpen(false)
              }}
              onMouseEnter={() => setActiveIndex(-1)}
              className="mt-1 flex w-full items-center gap-3 rounded-lg border-t border-gray-700/40 px-3 py-2.5 text-left text-sm text-gray-400 transition-colors hover:bg-gray-800/60 hover:text-gray-200"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-gray-500" />
              ) : (
                <Moon className="w-4 h-4 text-gray-500" />
              )}
              Toggle theme
              <span className="ml-auto text-[10px] uppercase tracking-wider text-gray-500">
                Action
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4 border-t border-gray-700/50 px-4 py-2 text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <Command className="w-3 h-3" /> K anywhere
            </span>
            <span>↑↓ navigate</span>
            <span>↵ open</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.isContentEditable
  )
}
