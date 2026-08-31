import { notFound } from 'next/navigation'
import { privateProjects } from '@/constants/projects'
import { Bot, CheckCircle, Cog, Database, GraduationCap, Layout, Shield, Zap, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  return privateProjects.map((project) => ({
    id: project.id,
  }))
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = privateProjects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  const { title, caseStudy, architecture, stack } = project

  if (!caseStudy && !architecture) {
    // If there's no technical case study, redirect back or show a minimal view
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-gray-400 mb-8">No detailed case study available for this project.</p>
          <Link href="/#projects" className="btn-primary px-6 py-2 rounded-lg">
            Return to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-20 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="bg-gray-900 border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-8 border-b border-purple-500/20 bg-gray-900/50">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient">{title}</h1>
            <p className="text-lg text-gray-400 mt-2">Technical Case Study & System Architecture</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid gap-12">
              {/* Case Study Overview */}
              {caseStudy && (
                <div className="grid gap-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                        <h2 className="font-bold uppercase tracking-wider text-sm">The Problem</h2>
                      </div>
                      <p className="text-gray-300 leading-relaxed bg-gray-800/30 p-5 rounded-xl border border-gray-700/30 h-full">
                        {caseStudy.problem}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-purple-400">
                        <Bot className="w-5 h-5" />
                        <h2 className="font-bold uppercase tracking-wider text-sm">My Role</h2>
                      </div>
                      <p className="text-gray-300 leading-relaxed bg-gray-800/30 p-5 rounded-xl border border-gray-700/30 h-full">
                        {caseStudy.role}
                      </p>
                    </div>
                  </div>

                  {/* Key Engineering Decisions */}
                  {caseStudy.keyEngineeringDecisions && caseStudy.keyEngineeringDecisions.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Cog className="w-5 h-5" />
                        <h2 className="font-bold uppercase tracking-wider text-sm">Key Engineering Decisions</h2>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {caseStudy.keyEngineeringDecisions.map((decision, idx) => (
                          <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-colors shadow-lg">
                            <h3 className="text-purple-300 font-bold mb-3 flex items-center gap-2">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-xs shrink-0">{idx + 1}</span>
                              {decision.title}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{decision.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Architecture Grid */}
              {architecture && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Layout className="w-5 h-5" />
                    <h2 className="font-bold uppercase tracking-wider text-sm">Architecture Deep-Dive</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Bot className="w-4 h-4" />
                        <h3 className="font-semibold text-xs uppercase">System Design</h3>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 h-full">
                        {architecture.systemDesign}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Database className="w-4 h-4" />
                        <h3 className="font-semibold text-xs uppercase">Storage Strategy</h3>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 h-full">
                        {architecture.storageStrategy}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Shield className="w-4 h-4" />
                        <h3 className="font-semibold text-xs uppercase">Auth & Security</h3>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 h-full">
                        {architecture.authStrategy}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Zap className="w-4 h-4" />
                        <h3 className="font-semibold text-xs uppercase">Scalability</h3>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/50 p-5 rounded-xl border border-gray-700/50 h-full">
                        {architecture.scalability}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Outcomes & Learning */}
              {caseStudy && (
                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-800">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <h2 className="font-bold uppercase tracking-wider text-sm">Outcome</h2>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                      &quot;{caseStudy.outcomes}&quot;
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-orange-400">
                      <GraduationCap className="w-5 h-5" />
                      <h2 className="font-bold uppercase tracking-wider text-sm">What I Learned</h2>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {caseStudy.learned}
                    </p>
                  </div>
                </div>
              )}

              {/* Tech Stack Summary */}
              {stack && stack.length > 0 && (
                <div className="pt-8 flex items-center justify-between border-t border-gray-800">
                  <div>
                    <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-tighter">Engineered with</h2>
                    <div className="flex flex-wrap gap-2">
                      {stack.map((tech, idx) => (
                        <span key={idx} className="text-xs font-mono text-purple-300/80 bg-purple-500/5 px-3 py-1.5 rounded-md border border-purple-500/10 shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
