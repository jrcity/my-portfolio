'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Code2, Github, Loader2, LayoutDashboard } from 'lucide-react'
import { useGithubRepos } from '@/hooks/use-github-repos'
import type { Project } from '@/types/project'

export default function Sandbox() {
  const { repos, isLoading } = useGithubRepos(20)
  const [selectedRepo, setSelectedRepo] = useState<Project | null>(null)
  const [iframeLoading, setIframeLoading] = useState(false)

  // Default to the first repo once loaded
  useEffect(() => {
    if (repos && repos.length > 0 && !selectedRepo) {
      setSelectedRepo(repos[0])
    }
  }, [repos, selectedRepo])

  const handleRepoSelect = (repo: Project) => {
    if (repo.id !== selectedRepo?.id) {
      setIframeLoading(true)
      setSelectedRepo(repo)
    }
  }

  // Extract the raw repo name from the GitHub URL since the 'title' might be formatted
  const getRepoName = (githubUrl: string | null | undefined) => {
    if (!githubUrl) return null
    const parts = githubUrl.split('/')
    return parts[parts.length - 1]
  }

  return (
    <section id="sandbox" className="py-20 bg-gray-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Architecture Sandbox</h2>
          <p className="text-xl text-muted-foreground">Interact with my live GitHub repositories directly in the browser.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 h-[700px]">
          {/* Repo Selection Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 bg-gray-900/80 border border-purple-500/20 rounded-2xl p-4 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
              <Github className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold">My Repositories</h3>
            </div>
            
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              </div>
            ) : (
              <div className="space-y-2">
                {repos.map((repo) => (
                  <button
                    key={repo.id}
                    onClick={() => handleRepoSelect(repo)}
                    className={`w-full text-left p-4 rounded-xl transition-all flex flex-col gap-2 ${
                      selectedRepo?.id === repo.id 
                        ? 'bg-purple-600/20 border border-purple-500/50 shadow-lg' 
                        : 'bg-gray-800/50 border border-transparent hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm truncate pr-2" title={repo.title}>
                        {repo.title}
                      </span>
                      {selectedRepo?.id === repo.id && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {repo.stack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-900/50 text-gray-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sandbox Viewer Area */}
          <div className="w-full lg:w-2/3 glass-effect rounded-2xl border border-blue-500/20 flex flex-col overflow-hidden relative">
            <div className="bg-gray-900/80 p-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-sm text-gray-200">
                  {selectedRepo ? `Previewing: ${selectedRepo.title}` : 'Select a repository'}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
            </div>

            <div className="flex-1 relative bg-[#1e1e1e]">
              {selectedRepo ? (
                <>
                  {iframeLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
                      <p className="text-sm text-gray-400 font-mono">Spinning up CodeSandbox container...</p>
                    </div>
                  )}
                  {getRepoName(selectedRepo.github) ? (
                    <iframe
                      src={`https://codesandbox.io/embed/github/jrcity/${getRepoName(selectedRepo.github)}?fontsize=14&hidenavigation=1&theme=dark&view=editor`}
                      style={{ width: '100%', height: '100%', border: 0, outline: 0 }}
                      title={selectedRepo.title}
                      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                      onLoad={() => setIframeLoading(false)}
                    />
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 h-full p-8 text-center">
                      <LayoutDashboard className="w-12 h-12 mb-4 opacity-50" />
                      <p>This is a private or conceptual project.</p>
                      <p className="text-sm mt-2">Architecture deep-dives are available in the Projects section.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 h-full">
                  <p>Select a repository from the sidebar to load the sandbox.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
