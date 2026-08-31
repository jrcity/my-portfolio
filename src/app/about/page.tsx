import About from "@/(components)/about";
import Footer from "@/(components)/footer";
import Navbar from "@/(components)/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About | Redemption Jonathan',
  description: 'Learn more about Redemption Jonathan, a software architect and CTO-level engineering leader.',
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
    </main>
  )
}
