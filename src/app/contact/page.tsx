import Footer from "@/(components)/footer";
import Navbar from "@/(components)/navbar";
import Contact from "@/(components)/sections/contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact | Redemption Jonathan',
  description: 'Get in touch for software architecture consulting or engineering leadership opportunities.',
};

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </main>
  )
}
