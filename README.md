<div align="center">

# 🚀 Redemption Jonathan — Portfolio

**Senior Fullstack Engineer · System Architect · CTO Mindset**

A sleek, animated developer portfolio showcasing production-grade projects, architectural philosophy, and a career timeline — built with Next.js 14) and deployed to GitHub Pages.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed on GitHub Pages](https://img.shields.io/badge/Live-GitHub_Pages-222?logo=github)](https://jrcity.github.io/my-portfolio)

[**View Live →**](https://jrcity.github.io/my-portfolio)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| **Typewriter Hero** | Animated headline cycling through *Architect · System Designer · Senior Engineer · CTO Mindset* |
| **Career Timeline** | Interactive journey from Frontend Mastery (2020) → Senior Systems Engineering (2025) |
| **Project Showcase** | Filterable cards (fullstack · mobile · web · API · AI) with architecture deep-dives |
| **Dark / Light Mode** | System-aware theme toggle via `next-themes` |
| **Contact Form** | Reach out directly from the site with toast notifications |
| **SEO Optimized** | OpenGraph, Twitter Cards, JSON-LD structured data, XML sitemap |
| **Smooth Animations** | Page-wide Framer Motion transitions, hover effects, and scroll reveals |
| **Fully Responsive** | Mobile-first design across all breakpoints |

---

## 🛠️ Tech Stack

```
Frontend     Next.js 14 · React 18 · TypeScript 5
Styling      Tailwind CSS 3 · Radix UI (Dialog, Select, Toast)
Animation    Framer Motion 10
Data         SWR · GitHub API integration
Icons        Lucide React
Fonts        Inter (Google Fonts)
Deployment   GitHub Pages (static export)
```

---

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── api/github/         # GitHub API route
│   ├── contact/            # Contact page
│   ├── projects/           # Projects page
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── sitemap.ts          # Dynamic XML sitemap
│   └── page.tsx            # Landing page
├── (components)/           # Shared UI components
│   ├── hero.tsx            # Typewriter hero section
│   ├── about.tsx           # Timeline + skills grid
│   ├── navbar.tsx          # Navigation bar
│   ├── projects.tsx        # Filterable project gallery
│   ├── project-card.tsx    # Individual project cards
│   ├── project-filter.tsx  # Category filter bar
│   ├── footer.tsx          # Site footer
│   ├── sections/           # Page-level section wrappers
│   └── ui/                 # Primitives (toast, social links, contact form)
├── constants/projects.ts   # Project data & architecture details
├── contexts/               # React context providers
├── hooks/                  # Custom hooks
├── types/project.ts        # TypeScript interfaces
└── utils/                  # Utility functions
```

---

## 🏗️ Featured Projects

| Project | Stack | Category |
|---|---|---|
| **GuardianCare Pro** — Healthcare support platform with shift scheduling, incident reporting & multi-tenant RBAC | React Native · NestJS · PostgreSQL · Prisma | Fullstack |
| **Cashworx** — Fintech platform for automated tax processing with state-level modeling | Laravel · MariaDB · OneSignal · Next.js · Flutter | Fullstack |
| **Jollivry** — Food delivery ecosystem with vendor onboarding & location-based services | React Native · NestJS · MongoDB · Google Maps API | Mobile |
| **Snap2Shop AI** — AI shopping assistant using computer vision for product matching | Next.js · Python · TensorFlow · PostgreSQL | AI |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended) or npm / yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/jrcity/my-portfolio.git
cd my-portfolio

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# (Optional) GitHub API token for project stats
GITHUB_TOKEN=your_github_token
```

### Build & Export

```bash
# Production build (static export)
pnpm build
```

The static output is written to the `out/` directory, ready for GitHub Pages deployment.

---

## 📬 Contact

- **Email** — [redemptionjonathan1@gmail.com](mailto:redemptionjonathan1@gmail.com)
- **GitHub** — [@jrcity](https://github.com/jrcity)
- **Location** — Remote / Available Worldwide

---

## 📄 License

This project is private. All rights reserved.

---

## 🙏 Attributions

- [Spaceship Vectors by Vecteezy](https://www.vecteezy.com/free-vector/spaceship)
- [Vintage Vectors by Vecteezy](https://www.vecteezy.com/free-vector/vintage)
