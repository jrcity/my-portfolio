'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Bot, Play, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { privateProjects } from '@/constants/projects'

export default function PreviewContent({ id }: { id: string }) {
  const project = privateProjects.find((p) => p.id === id)
  
  const [messages, setMessages] = useState([
    { role: 'ai', content: `Welcome to the interactive container for **${project?.title || 'this project'}**. I'm your AI guide. You can ask me how to navigate the codebase or how to run specific services.` }
  ])
  const [input, setInput] = useState('')
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Initializing secure container environment...',
    'Loading project dependencies...',
    `Mounting workspace for ${project?.title || 'Project'}...`,
    'Container ready. Type commands to interact or ask the AI guide.'
  ])
  const [isTyping, setIsTyping] = useState(false)
  
  const chatEndRef = useRef<HTMLDivElement>(null)
  const terminalEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalOutput])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Project not found</h1>
      </div>
    )
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setIsTyping(true)

    // Simulate AI response based on project stack and architecture
    setTimeout(() => {
      let aiResponse = ''
      const lowerInput = userMessage.toLowerCase()

      if (lowerInput.includes('start') || lowerInput.includes('run')) {
        aiResponse = `To start the application, you can run \`npm run dev\` or \`docker-compose up\` in the terminal. The architecture relies on ${project.stack.join(', ')}.`
        setTerminalOutput(prev => [...prev, `root@container:/workspace$ npm run dev`, '> Starting development server...', '> Server listening on port 3000'])
      } else if (lowerInput.includes('architecture') || lowerInput.includes('database')) {
        aiResponse = `This project uses ${project.architecture?.storageStrategy}. Would you like me to execute a query or show you the schema?`
      } else {
        aiResponse = `I'm an AI simulated guide for ${project.title}. I can help you understand the codebase, run services, or inspect the ${project.category} architecture.`
      }

      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/#projects" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {project.title} - AI Interactive Preview
            </h1>
            <p className="text-sm text-gray-400">Container Sandbox ID: {project.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Container Active
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
        
        {/* Mock IDE / Terminal Area */}
        <div className="lg:col-span-2 flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-gray-950 px-4 py-3 flex items-center border-b border-gray-800 gap-2">
            <Terminal className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-mono text-gray-300">Terminal - root@container:/workspace</span>
          </div>
          <div className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-[#0d1117] text-gray-300 space-y-2">
            {terminalOutput.map((line, i) => (
              <div key={i} className={line.startsWith('root@') ? 'text-green-400 mt-4' : 'text-gray-300'}>
                {line}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>
        </div>

        {/* AI Chat Guide */}
        <div className="flex flex-col bg-gray-900 border border-purple-500/30 rounded-xl overflow-hidden shadow-2xl shadow-purple-500/10">
          <div className="bg-gray-950 px-4 py-3 flex items-center justify-between border-b border-purple-500/30">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-100">AI Architect Guide</span>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'self-end' : 'self-start'}`}
              >
                <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-sm' : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-bl-sm'}`}>
                  {msg.content}
                </div>
                <span className={`text-[10px] text-gray-500 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.role === 'user' ? 'You' : 'AI Guide'}
                </span>
              </motion.div>
            ))}
            {isTyping && (
              <div className="self-start bg-gray-800 border border-gray-700 p-3 rounded-2xl rounded-bl-sm">
                <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-800 bg-gray-950">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about the architecture..."
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-500 rounded-md transition-colors disabled:opacity-50"
              >
                <Play className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
