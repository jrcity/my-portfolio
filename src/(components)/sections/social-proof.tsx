'use client'

import { motion } from 'framer-motion'
import { Users, Building2, Globe2, Briefcase } from 'lucide-react'

const stats = [
  {
    label: 'Years of Experience',
    value: '5+',
    icon: <Briefcase className="w-6 h-6 text-purple-400" />
  },
  {
    label: 'Production Systems Shipped',
    value: '12+',
    icon: <Building2 className="w-6 h-6 text-blue-400" />
  },
  {
    label: 'Users Served (Global)',
    value: '500k+',
    icon: <Globe2 className="w-6 h-6 text-green-400" />
  },
  {
    label: 'Happy Clients',
    value: '20+',
    icon: <Users className="w-6 h-6 text-orange-400" />
  }
]

export default function SocialProof() {
  return (
    <section className="py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Proven <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Metrics and numbers that showcase the scale and reliability of the systems I&apos;ve engineered.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-effect rounded-2xl p-6 text-center group hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors border border-gray-200 dark:border-gray-800"
            >
              <div className="mx-auto w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-3xl mx-auto shadow-xl border border-gray-100 dark:border-gray-700 relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-serif">
              &quot;
            </div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-6 mt-4">
              &quot;Jonathan brings a CTO-level mindset to every project. His ability to architect scalable solutions while maintaining clean code is unparalleled. He doesn&apos;t just write code; he builds robust systems that stand the test of time.&quot;
            </p>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Engineering Director</h4>
              <p className="text-sm text-purple-500">Global Tech Enterprise</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
