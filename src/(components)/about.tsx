'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Cloud, Database, Globe, Zap } from 'lucide-react'


const skills = [
  { name: 'System Architecture', icon: Cloud, color: 'text-indigo-500' },
  { name: 'NestJS (Service Layers)', icon: Zap, color: 'text-green-400' },
  { name: 'Laravel (RBAC & Queues)', icon: Code, color: 'text-red-400' },
  { name: 'PostgreSQL (ORM Modeling)', icon: Database, color: 'text-indigo-400' },
  { name: 'React / Next.js', icon: Code, color: 'text-blue-400' },
  { name: 'React Native (Cross-Platform)', icon: Smartphone, color: 'text-purple-400' },
  { name: 'TanStack Query / State', icon: Zap, color: 'text-yellow-400' },
  { name: 'Redis Caching', icon: Database, color: 'text-red-500' },
  { name: 'Tailwind / Radix UI', icon: Globe, color: 'text-cyan-400' },
  { name: 'Push Notifications', icon: Zap, color: 'text-orange-400' },
  { name: 'Cloud & DevOps (AWS)', icon: Cloud, color: 'text-orange-500' },
  { name: 'API Design (OpenAPI)', icon: Globe, color: 'text-gray-400' },
]


const timeline = [
  {
    year: '2020-2021',
    title: 'Frontend Mastery',
    description: 'Developed highly optimized web applications with React, focusing on state management and performance.',
    icon: Code,
  },
  {
    year: '2022',
    title: 'Mobile & API Integration',
    description: 'Built cross-platform mobile apps with React Native and Flutter, mastering complex API consumption and offline-first patterns.',
    icon: Smartphone,
  },
  {
    year: '2023',
    title: 'Architectural Shift',
    description: 'Transitioned to backend-heavy roles. Specialized in NestJS and Laravel, implementing Django-inspired service layers and multi-tenant RBAC systems.',
    icon: Cloud,
  },
  {
    year: '2024',
    title: 'Fullstack Leadership',
    description: 'Engineered end-to-end production systems (Foodly, Cashworx). Architected scalable backends supporting mobile + web ecosystems with real-time sync.',
    icon: Zap,
  },
  {
    year: '2025',
    title: 'Senior Systems Engineering',
    description: 'Designing high-availability systems for Fintech and Healthcare. Focus on predictable API contracts, CTO-level maintainability, and CI/CD pipelines.',
    icon: Zap,
  },
]


export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Architectural Philosophy</h2>
          <p className="text-xl text-muted-foreground">Engineering Scalability, Maintainability & Predictability</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-purple-400">The Senior Perspective</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I approach software with a **CTO-level mindset**. I prioritize clean architecture and strong separation of concerns, mirroring Django’s structured philosophy across NestJS, Laravel, and Express environments. 
              My goal is to ship systems that are not just functional, but scalable from day one and easily maintainable for long-term growth.
            </p>

            <div className="space-y-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <span className="text-sm text-purple-400">({item.year})</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-purple-400">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-4 rounded-xl text-center hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <skill.icon className={`w-8 h-8 mx-auto mb-2 ${skill.color}`} />
                  <p className="font-semibold text-sm">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}