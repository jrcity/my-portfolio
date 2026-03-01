import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/(components)/theme-provider'
import { Toaster } from '@/(components)/ui/toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Define the base URL for your site
const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://jrcity.github.io/my-portfolio' 
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Redemption Jonathan - Full Stack Developer & Software Engineer',
    template: '%s | Redemption Jonathan'
  },
  description: 'Passionate full-stack developer and software engineer specializing in React, Next.js, TypeScript, Node.js, and mobile development. Available for hire, freelance projects, and consulting in Nigeria and globally.',
  keywords: [
    // Core Skills
    'full stack developer', 'software engineer', 'web developer', 'mobile developer',
    'frontend developer', 'backend developer', 'full-stack engineer',
    
    // Technologies - Frontend
    'react developer', 'next.js developer', 'typescript developer', 'javascript developer',
    'react native developer', 'flutter developer', 'vue.js developer', 'angular developer',
    'html5', 'css3', 'tailwind css', 'bootstrap', 'sass', 'scss',
    
    // Technologies - Backend
    'node.js developer', 'express.js developer', 'nest.js developer', 'api development',
    'rest api', 'graphql', 'microservices', 'serverless', 'aws lambda',
    
    // Databases
    'mongodb developer', 'postgresql developer', 'mysql developer', 'redis developer',
    'database design', 'nosql', 'sql developer',
    
    // Cloud & DevOps
    'aws developer', 'azure developer', 'google cloud', 'docker', 'kubernetes',
    'ci/cd', 'github actions', 'vercel', 'netlify', 'heroku',
    
    // Mobile Development
    'react native', 'flutter', 'ios developer', 'android developer', 'mobile app development',
    'cross platform development', 'native mobile development',
    
    // Specializations
    'ecommerce developer', 'dashboard development', 'admin panel development',
    'saas development', 'fintech developer', 'api integration',
    
    // Location & Availability
    'nigerian developer', 'nigeria', 'lagos developer', 'abuja developer',
    'remote developer', 'freelance developer', 'contract developer',
    'hire developer', 'developer for hire', 'software consultant',
    
    // Services
    'web development services', 'mobile app development services',
    'custom software development', 'mvp development', 'prototype development',
    'code review', 'technical consulting', 'system architecture',
    'performance optimization', 'bug fixing', 'debugging',
    
    // Portfolio Related
    'portfolio', 'projects', 'github', 'open source', 'code samples',
    'developer portfolio', 'software engineer portfolio',
    
    // Industry Terms
    'fintech', 'edtech', 'healthtech', 'proptech', 'startup developer',
    'enterprise development', 'scalable applications', 'high performance',
    
    // Additional Skills
    'git', 'agile', 'scrum', 'test driven development', 'unit testing',
    'integration testing', 'code quality', 'clean code', 'solid principles'
  ],
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
        url: '/images/og-image.jpg', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'Redemption Jonathan - Full Stack Developer Portfolio',
      },
      {
        url: '/images/profile-photo.jpg', // Your profile photo
        width: 800,
        height: 800,
        alt: 'Redemption Jonathan - Software Engineer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@your_twitter_handle', // Replace with your actual Twitter handle
    creator: '@your_twitter_handle', // Replace with your actual Twitter handle
    title: 'Redemption Jonathan - Full Stack Developer & Software Engineer',
    description: 'Passionate full-stack developer specializing in React, Next.js, TypeScript, and mobile development. Available for hire.',
    images: ['/images/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO meta tags */}
        <link rel="canonical" href={baseUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="web" />
        <meta name="rating" content="general" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.github.com" />
        
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
                "https://linkedin.com/in/your-linkedin", // Replace with your LinkedIn
                "https://twitter.com/your-twitter", // Replace with your Twitter
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
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}