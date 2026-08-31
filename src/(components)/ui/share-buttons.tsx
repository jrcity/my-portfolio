'use client'

import { useState } from 'react'
import { Check, Link2, Linkedin, Twitter } from 'lucide-react'

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false)

  // Resolve against the current origin so it's correct in every environment
  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareTargets = [
    {
      label: 'Share on X',
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Twitter className="w-4 h-4" />,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin className="w-4 h-4" />,
    },
  ]

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — the link is visible in the address bar anyway
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wider text-gray-500 mr-1">
        Share
      </span>
      {shareTargets.map((target) => (
        <a
          key={target.label}
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={target.label}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-700/50 bg-gray-800/40 text-gray-400 hover:text-purple-300 hover:border-purple-500/40 transition-colors"
        >
          {target.icon}
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="Copy link"
        className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-700/50 bg-gray-800/40 text-gray-400 hover:text-purple-300 hover:border-purple-500/40 transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  )
}
