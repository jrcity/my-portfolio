'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { privateProjects } from '@/constants/projects'
import type { Project } from '@/types/project'
import ProjectFilter from './project-filter'
import ProjectCard from './project-card'
import { useGithubRepos } from '@/hooks/use-github-repos'

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const { repos: githubRepos, isLoading, isError, errorMessage, meta } = useGithubRepos(50) // Increased to 50 to get more repos for pagination

  // Safely combine GitHub repos with private projects
  const allProjects = useMemo(
    () => [...(githubRepos || []), ...(privateProjects || [])],
    [githubRepos]
  )

  // Calculate filtered projects and total pages
  const filteredProjects = useMemo(
    () => filter === 'all'
      ? allProjects
      : allProjects.filter(project => project.category === filter),
    [filter, allProjects]
  )

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setDisplayedProjects(filteredProjects.slice(startIndex, endIndex))
  }, [filteredProjects, currentPage])

  return (
    <section id="projects" className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground">A showcase of my recent work and contributions</p>
        </motion.div>

        <ProjectFilter currentFilter={filter} onFilterChange={setFilter} />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading GitHub repositories...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-8 mb-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-red-400 text-sm">
                ⚠️ Could not load GitHub repositories
                {errorMessage && (
                  <span className="block mt-1 text-xs opacity-75">
                    {errorMessage}
                  </span>
                )}
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Showing {privateProjects?.length || 0} private projects
              </p>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`} // More unique key
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : !isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects found for the current filter.</p>
          </div>
        ) : null}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
              Previous
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === page
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 hover:bg-gray-700 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && meta && (
          <div className="mt-8 text-center">
            <details className="text-xs text-gray-500">
              <summary className="cursor-pointer">Debug Info</summary>
              <div className="mt-2 text-left max-w-lg mx-auto bg-gray-900/50 p-3 rounded">
                <p>GitHub Repos: {githubRepos?.length || 0}</p>
                <p>Private Projects: {privateProjects?.length || 0}</p>
                <p>Rate Limit: {meta.rateLimit.remaining}/{meta.rateLimit.limit}</p>
                <p>Filter: {filter}</p>
                <p>Current Page: {currentPage}</p>
              </div>
            </details>
          </div>
        )}
      </div>
    </section>
  )
}