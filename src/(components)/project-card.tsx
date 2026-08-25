// components/project-card.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, Calendar, Layout, Database, Shield, Zap, X, Bot, FileText, CheckCircle, GraduationCap, AlertCircle, Cog } from 'lucide-react'
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
    architecture,
    caseStudy
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
            {(architecture || caseStudy) && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowArch(true)}
                className="flex items-center gap-2 px-4 py-2 btn-primary rounded-lg transition-all text-sm font-semibold justify-center w-full"
              >
                <FileText className="w-4 h-4" />
                Technical Case Study
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
        {showArch && (architecture || caseStudy) && (
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
              className="relative w-full max-w-4xl bg-gray-900 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-purple-500/20 flex items-center justify-between bg-gray-900/50">
                <div>
                  <h3 className="text-2xl font-bold text-gradient">{title}</h3>
                  <p className="text-sm text-gray-400 mt-1">Technical Case Study & System Architecture</p>
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
                <div className="grid gap-10">

                  {/* Case Study Overview */}
                  {caseStudy && (
                    <div className="grid gap-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-red-400">
                            <AlertCircle className="w-5 h-5" />
                            <h4 className="font-bold uppercase tracking-wider text-sm">The Problem</h4>
                          </div>
                          <p className="text-gray-300 leading-relaxed bg-gray-800/30 p-4 rounded-xl border border-gray-700/30">
                            {caseStudy.problem}
                          </p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-purple-400">
                            <Bot className="w-5 h-5" />
                            <h4 className="font-bold uppercase tracking-wider text-sm">My Role</h4>
                          </div>
                          <p className="text-gray-300 leading-relaxed bg-gray-800/30 p-4 rounded-xl border border-gray-700/30">
                            {caseStudy.role}
                          </p>
                        </div>
                      </div>

                      {/* Key Engineering Decisions */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-yellow-400">
                          <Cog className="w-5 h-5" />
                          <h4 className="font-bold uppercase tracking-wider text-sm">Key Engineering Decisions</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          {caseStudy.keyEngineeringDecisions.map((decision, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-5 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                              <h5 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-xs">{idx + 1}</span>
                                {decision.title}
                              </h5>
                              <p className="text-sm text-gray-400 leading-relaxed">{decision.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Architecture Grid */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Layout className="w-5 h-5" />
                      <h4 className="font-bold uppercase tracking-wider text-sm">Architecture Deep-Dive</h4>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {architecture && (
                        <>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Bot className="w-4 h-4" />
                              <h5 className="font-semibold text-xs uppercase">System Design</h5>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 h-full">
                              {architecture.systemDesign}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Database className="w-4 h-4" />
                              <h5 className="font-semibold text-xs uppercase">Storage Strategy</h5>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 h-full">
                              {architecture.storageStrategy}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Shield className="w-4 h-4" />
                              <h5 className="font-semibold text-xs uppercase">Auth & Security</h5>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 h-full">
                              {architecture.authStrategy}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Zap className="w-4 h-4" />
                              <h5 className="font-semibold text-xs uppercase">Scalability</h5>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 h-full">
                              {architecture.scalability}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Outcomes & Learning */}
                  {caseStudy && (
                    <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-gray-800">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-green-400">
                          <CheckCircle className="w-5 h-5" />
                          <h4 className="font-bold uppercase tracking-wider text-sm">Outcome</h4>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed italic">
                          "{caseStudy.outcomes}"
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-orange-400">
                          <GraduationCap className="w-5 h-5" />
                          <h4 className="font-bold uppercase tracking-wider text-sm">What I Learned</h4>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          {caseStudy.learned}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Summary */}
                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-tighter">Engineered with</h4>
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
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-purple-500/20 bg-gray-900/50 flex justify-end gap-3">
                <button
                  onClick={() => setShowArch(false)}
                  className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}