import React from 'react'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/(components)/theme-provider'
import { Toaster } from '@/(components)/ui/toast'
import { ChatWidget } from '@/(components)/ui/chat-widget'
import { Analytics } from '@vercel/analytics/react'
import { CommandPalette } from '@/(components)/command-palette'
import { getPostMetas } from '@/lib/blog'
import './globals.css'

// Define the base URL for your site
const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://redemption-chi.vercel.app'
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Redemption Jonathan - Full Stack Developer & Software Engineer',
    template: '%s | Redemption Jonathan'
  },
  description: 'Passionate full-stack developer and software engineer specializing in React, Next.js, TypeScript, Node.js, and mobile development. Available for hire, freelance projects, and consulting in Nigeria and globally.',
  authors: [
    {
      name: 'Redemption Jonathan',
      url: 'https://github.com/jrcity'
    }
  ],
  creator: 'Redemption Jonathan',
  publisher: 'Redemption Jonathan',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Redemption Jonathan - Full Stack Developer',
    title: 'Redemption Jonathan - Full Stack Developer & Software Engineer',
    description: 'Passionate full-stack developer and software engineer specializing in React, Next.js, TypeScript, Node.js, and mobile development. Available for hire, freelance projects, and consulting.',
    images: [
      {
        url: '/brand-logo.png',
        width: 1280,
        height: 853,
        alt: 'Redemption Jonathan - Full Stack Developer Portfolio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@_crakton',
    creator: '@_crakton',
    title: 'Redemption Jonathan - Full Stack Developer & Software Engineer',
    description: 'Passionate full-stack developer specializing in React, Next.js, TypeScript, and mobile development. Available for hire.',
    images: ['/brand-logo.png'],
  },
  alternates: {
    canonical: baseUrl,
  },
  category: 'technology',
  classification: 'Software Development',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Additional metadata for better SEO
  other: {
    'application-name': 'Redemption Jonathan Portfolio',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Redemption Portfolio',
    'msapplication-TileColor': '#9333ea',
    'theme-color': '#9333ea',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Favicon and App Icons */}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://api.github.com" />

        {/* RSS autodiscovery */}
        <link rel="alternate" type="application/rss+xml" title="Redemption Jonathan — Blog" href="/rss.xml" />

        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Redemption Jonathan",
              "alternateName": "jrcity",
              "jobTitle": "Full Stack Developer",
              "description": "Passionate full-stack developer and software engineer specializing in React, Next.js, TypeScript, Node.js, and mobile development.",
              "url": baseUrl,
              "sameAs": [
                "https://github.com/jrcity",
                "https://www.linkedin.com/in/redemption",
                "https://x.com/_crakton",
              ],
              "knowsAbout": [
                "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
                "React Native", "Flutter", "MongoDB", "PostgreSQL", "AWS"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Software Engineer",
                "occupationLocation": {
                  "@type": "Country",
                  "name": "Nigeria"
                }
              }
            })
          }}
        />
      </head>
      <body className="font-satoshi">
        <ThemeProvider>
          {children}
          <Toaster />
          <ChatWidget />
          <CommandPalette
            posts={getPostMetas().map((p) => ({
              slug: p.slug,
              title: p.title,
              tags: p.tags,
            }))}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}