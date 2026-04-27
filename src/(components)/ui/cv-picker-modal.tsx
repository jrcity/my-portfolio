'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Server, Layout, Code2, X, DownloadCloud } from 'lucide-react'

interface CVPickerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CVPickerModal({ open, onOpenChange }: CVPickerModalProps) {
  const [isGenerating, setIsGenerating] = React.useState(false)

  const handleDownload = async (type: 'backend' | 'frontend' | 'fullstack') => {
    setIsGenerating(true)
    try {
      const OUTPUT_FILENAME_MAP: Record<string, string> = {
        fullstack: 'FS_Redemption_Jonathan_Resume.docx',
        backend: 'BE_Redemption_Jonathan_Resume.docx',
        frontend: 'FE_Redemption_Jonathan_Resume.docx',
      }
      
      const filename = OUTPUT_FILENAME_MAP[type]
      const url = `/cv/${filename}`

      const a = document.createElement('a')
      a.href = url
      a.download = `Redemption_Jonathan_CV_${type}.docx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      onOpenChange(false)
    } catch (error) {
      console.error(error)
      alert('Error downloading CV. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="w-full max-w-md bg-background/90 border border-border shadow-2xl p-6 rounded-2xl glass-effect"
                >
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-xl font-bold">Download CV</Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <Dialog.Description className="text-muted-foreground mb-6">
                  Select a tailored version of my resume generated specifically for your needs.
                </Dialog.Description>

                <div className="grid gap-3">
                  <button
                    onClick={() => handleDownload('fullstack')}
                    disabled={isGenerating}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-purple-500 hover:bg-purple-500/10 transition-all group disabled:opacity-50"
                  >
                    <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                      <Code2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">Fullstack Engineer</div>
                      <div className="text-sm text-muted-foreground">Comprehensive overview of end-to-end skills</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDownload('backend')}
                    disabled={isGenerating}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-blue-500 hover:bg-blue-500/10 transition-all group disabled:opacity-50"
                  >
                    <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                      <Server className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">Backend Architect</div>
                      <div className="text-sm text-muted-foreground">Focus on system design, APIs, and databases</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDownload('frontend')}
                    disabled={isGenerating}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-pink-500 hover:bg-pink-500/10 transition-all group disabled:opacity-50"
                  >
                    <div className="p-3 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors">
                      <Layout className="w-6 h-6 text-pink-400" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">Frontend Specialist</div>
                      <div className="text-sm text-muted-foreground">Focus on UI/UX, animations, and React</div>
                    </div>
                  </button>
                </div>

                {isGenerating && (
                  <div className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
                    Generating tailored PDF...
                  </div>
                )}
                </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}