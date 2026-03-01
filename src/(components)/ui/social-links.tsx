'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/jrcity', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/redemption', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/_crakton', label: 'Twitter' },
  { icon: Mail, href: 'mailto:redemptionjonathan1@gmail.com', label: 'Email' },
]

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4 mt-8">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
          aria-label={link.label}
        >
          <link.icon className="w-6 h-6 text-white" />
        </motion.a>
      ))}
    </div>
  )
}