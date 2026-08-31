import Footer from "@/(components)/footer";
import Navbar from "@/(components)/navbar";
import Projects from "@/(components)/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Projects & Case Studies | Redemption Jonathan',
  description: 'Deep dive into the architecture and engineering decisions of my most impactful projects.',
};

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <Projects />
      </div>
      <Footer />
    </main>
  )
}
