// components/project-card.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, Calendar, Layout, Database, Shield, Zap, X, Bot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [showArch, setShowArch] = useState(false)
  
  const {
    id = 'unknown',
    title = 'Untitled Project',
    description = 'No description available',
    image,
    stack = [],
    github,
    demo,
    stats,
    architecture
  } = project

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="glass-effect rounded-xl overflow-hidden group h-full flex flex-col"
      >
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gray-800">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
              <span className="text-2xl font-bold text-white opacity-50">
                {title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-aurora-black/60 to-transparent" />
          
          {/* Stats overlay */}
          {stats && (
            <div className="absolute top-4 right-4 flex gap-2">
              {stats.stars !== undefined && stats.stars > 0 && (
                <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full text-xs">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span>{stats.stars}</span>
                </div>
              )}
              {stats.forks !== undefined && stats.forks > 0 && (
                <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full text-xs">
                  <GitFork className="w-3 h-3 text-blue-400" />
                  <span>{stats.forks}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-300 mb-4 flex-1 text-sm leading-relaxed">
            {description}
          </p>

          {/* Tech Stack */}
          {Array.isArray(stack) && stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {stack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-auto">
            {architecture && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowArch(true)}
                className="flex items-center gap-2 px-4 py-2 btn-primary rounded-lg transition-all text-sm font-semibold justify-center w-full"
              >
                <Layout className="w-4 h-4" />
                Architecture Deep-Dive
              </motion.button>
            )}

            <div className="flex gap-3">
              {github && (
                <motion.a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 btn-outline rounded-lg transition-colors text-sm font-medium flex-1 justify-center"
                >
                  <Github className="w-4 h-4" />
                  Code
                </motion.a>
              )}
              
              {demo ? (
                <motion.a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 btn-primary rounded-lg transition-colors text-sm font-medium flex-1 justify-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </motion.a>
              ) : (
                <Link href={`/projects/${id}/preview`} className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg transition-colors text-sm font-medium h-full justify-center shadow-lg shadow-purple-500/20"
                  >
                    <Bot className="w-4 h-4" />
                    AI Preview
                  </motion.div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Architecture Modal */}
      <AnimatePresence>
        {showArch && architecture && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowArch(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-gray-900 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-purple-500/20 flex items-center justify-between bg-gray-900/50">
                <div>
                  <h3 className="text-2xl font-bold text-gradient">{title}</h3>
                  <p className="text-sm text-gray-400 mt-1">System Architecture & Engineering Rationale</p>
                </div>
                <button
                  onClick={() => setShowArch(false)}
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <div className="grid gap-8">
                  {/* System Design */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-purple-400">
                      <Layout className="w-5 h-5" />
                      <h4 className="font-bold uppercase tracking-wider text-sm">System Design</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                      {architecture.systemDesign}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Storage Strategy */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Database className="w-5 h-5" />
                        <h4 className="font-bold uppercase tracking-wider text-sm">Storage Strategy</h4>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                        {architecture.storageStrategy}
                      </p>
                    </div>

                    {/* Auth Strategy */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-green-400">
                        <Shield className="w-5 h-5" />
                        <h4 className="font-bold uppercase tracking-wider text-sm">Auth & Security</h4>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                        {architecture.authStrategy}
                      </p>
                    </div>
                  </div>

                  {/* Scalability */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-orange-400">
                      <Zap className="w-5 h-5" />
                      <h4 className="font-bold uppercase tracking-wider text-sm">Scalability & Performance</h4>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                      {architecture.scalability}
                    </p>
                  </div>

                  {/* Tech Stack Summary */}
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-tighter">Engineered with</h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.map((tech, idx) => (
                        <span key={idx} className="text-xs font-mono text-purple-300/80 bg-purple-500/5 px-2 py-1 rounded border border-purple-500/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-purple-500/20 bg-gray-900/50 flex justify-end gap-3">
                <button
                  onClick={() => setShowArch(false)}
                  className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}