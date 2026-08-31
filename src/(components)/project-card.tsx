// components/project-card.tsx
'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Star, GitFork, Calendar, Layout, Database, Shield, Zap, X, Bot, FileText, CheckCircle, GraduationCap, AlertCircle, Cog } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  

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
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
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

          <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1 text-sm leading-relaxed">
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
              <Link href={`/projects/${id}`} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 py-2 btn-primary rounded-lg transition-all text-sm font-semibold justify-center w-full"
                >
                  <FileText className="w-4 h-4" />
                  Technical Case Study
                </motion.div>
              </Link>
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

      </>
  )
}