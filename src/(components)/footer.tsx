'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-center items-center space-x-2 cursor-pointer"
            >
              <div className="flex items-center justify-center p-1">
                <Image src="/brand-logo.png" alt="Logo" width={200} height={100} />
              </div>

            </motion.div>
          </Link>

          <p className="text-muted-foreground mb-4">
            Built with passion using Next.js, TailwindCSS, and Framer Motion
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Redemption Jonathan. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
