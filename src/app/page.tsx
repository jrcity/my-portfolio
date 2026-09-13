import About from "@/(components)/about";
import Footer from "@/(components)/footer";
import Hero from "@/(components)/hero";
import SocialProof from "@/(components)/sections/social-proof";
import Navbar from "@/(components)/navbar";
import Projects from "@/(components)/projects";
import Sandbox from "@/(components)/sections/sandbox";
import Contact from "@/(components)/sections/contact";
import ParticleBackground from "@/(components)/ui/partical-background";

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://redemption-chi.vercel.app'
  : 'http://localhost:3000'

// WebSite + ProfessionalService structured data for rich search results
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Redemption Jonathan — Portfolio',
      url: baseUrl,
      author: { '@type': 'Person', name: 'Redemption Jonathan' },
    },
    {
      '@type': 'ProfessionalService',
      name: 'Redemption Jonathan — Full Stack Development & Consulting',
      url: baseUrl,
      description: 'Full-stack software engineering specializing in React, Next.js, TypeScript, Node.js, and mobile development. Available for freelance projects and consulting.',
      areaServed: 'Worldwide',
      priceRange: '$$',
      knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'React Native', 'Flutter', 'PostgreSQL', 'MongoDB', 'AWS'],
    },
  ],
}

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ParticleBackground />
      <Navbar />
      <Hero />
      <SocialProof />
      <About />
      <Projects />
      <Sandbox />
      <Contact />
      <Footer />
    </main>
  )
}
