import About from "@/(components)/about";
import Footer from "@/(components)/footer";
import Hero from "@/(components)/hero";
import SocialProof from "@/(components)/sections/social-proof";
import Navbar from "@/(components)/navbar";
import Projects from "@/(components)/projects";
import Sandbox from "@/(components)/sections/sandbox";
import Contact from "@/(components)/sections/contact";
import ParticleBackground from "@/(components)/ui/partical-background";


export default function Home() {
  return (
    <main className="relative">
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
