'use client'

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, isTextUIPart } from 'ai';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react'

const SESSION_KEY = 'chat_session_id'

function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const [input, setInput] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [historyLoaded, setHistoryLoaded] = useState(false)

  // Build the transport once sessionId is known so body is stable
  const transport = useMemo(
    () => sessionId ? new DefaultChatTransport({ body: { sessionId } }) : undefined,
    [sessionId]
  )

  const { messages, sendMessage, status, setMessages, error } = useChat(
    transport ? { transport } : {}
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialise session ID and hydrate last-24h history on mount
  useEffect(() => {
    const id = getOrCreateSessionId()
    setSessionId(id)

    fetch(`/api/chat?sessionId=${id}`)
      .then((res) => res.json())
      .then(({ messages: history }: { messages: { id: string; role: string; content: string }[] }) => {
        if (history?.length > 0) {
          setMessages(
            history.map((m) => ({
              id: m.id,
              role: m.role as 'user' | 'assistant',
              parts: [{ type: 'text' as const, text: m.content }],
              metadata: undefined,
            }))
          )
        }
      })
      .catch((err) => console.error('[chat] Failed to load history:', err))
      .finally(() => setHistoryLoaded(true))
  }, [setMessages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === 'streaming' || status === 'submitted') return
    sendMessage({ text: input })
    setInput('')
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setHasUnread(false)
    } else if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setHasUnread(true)
    }
  }, [messages, isOpen, scrollToBottom])

  const toggleChat = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="glass-effect mb-4 w-80 sm:w-96 h-[500px] max-h-[80vh] rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-purple-600/20 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Redemption&apos;s AI Clone</h3>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/40">
                {!historyLoaded && (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="w-5 h-5 animate-spin text-purple-400/50" />
                  </div>
                )}

                {messages.length === 0 && historyLoaded && (
                  <div className="text-center text-gray-400 text-sm mt-10 space-y-3">
                    <Bot className="w-10 h-10 mx-auto text-purple-400/50" />
                    <p>Hi! I&apos;m Redemption&apos;s AI assistant. Ask me about his tech stack, experience, or availability!</p>
                  </div>
                )}

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'assistant' && (
                      <div className="w-8 h-8 shrink-0 rounded-full bg-purple-500/20 flex items-center justify-center self-end mb-1">
                        <Bot className="w-4 h-4 text-purple-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                        m.role === 'user'
                          ? 'bg-purple-600 text-white rounded-br-sm'
                          : 'bg-white/10 border border-white/5 text-gray-200 rounded-bl-sm'
                      }`}
                    >
                      {m.parts.filter(isTextUIPart).map((p, i) => (
                        <span key={i}>{p.text}</span>
                      ))}
                    </div>
                  </div>
                ))}

                {error && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-red-500/20 flex items-center justify-center self-end mb-1">
                      <Bot className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="max-w-[75%] p-3 rounded-2xl text-sm bg-red-500/10 border border-red-500/20 text-red-200 rounded-bl-sm">
                      {error.message || 'An error occurred while generating the response.'}
                    </div>
                  </div>
                )}

                {(status === 'streaming' || status === 'submitted') && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-purple-500/20 flex items-center justify-center self-end mb-1">
                      <Bot className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="p-3 rounded-2xl text-sm bg-white/10 border border-white/5 text-gray-200 rounded-bl-sm flex items-center">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-black/60 border-t border-white/10 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-500"
                    disabled={status === 'streaming' || status === 'submitted'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'streaming' || status === 'submitted' || !input.trim()}
                    className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 flex items-center justify-center text-white mr-2"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}

          {hasUnread && !isOpen && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-background rounded-full animate-pulse" />
          )}
        </motion.button>
      </motion.div>
    </>
  )
}
