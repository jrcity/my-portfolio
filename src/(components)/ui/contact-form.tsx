'use client'

import { motion } from 'framer-motion'
import { Send, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const getNigeriaTime = () =>
    new Date().toLocaleString('en-NG', {
      timeZone: 'Africa/Lagos',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('submitting')
    setErrorMsg('')

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
    const autoreplyTemplateId = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: getNigeriaTime(),
    }

    try {
      // 1. Send notification to owner
      await emailjs.send(serviceId, templateId, templateParams, publicKey)

      // 2. Send autoreply to the sender (if autoreply template is configured)
      if (autoreplyTemplateId && autoreplyTemplateId !== '') {
        await emailjs.send(serviceId, autoreplyTemplateId, templateParams, publicKey)
      }

      setSubmitState('success')

      // Reset form after 4 seconds
      setTimeout(() => {
        setSubmitState('idle')
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 4000)
    } catch (error: any) {
      console.error('EmailJS Error:', error)
      setErrorMsg(
        error?.text || 'Something went wrong. Please try emailing me directly.'
      )
      setSubmitState('error')

      setTimeout(() => {
        setSubmitState('idle')
        setErrorMsg('')
      }, 5000)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const isSubmitting = submitState === 'submitting'
  const isSuccess = submitState === 'success'
  const isError = submitState === 'error'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting || isSuccess}
            className="w-full px-4 py-3 glass-effect rounded-xl bg-transparent border border-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-60"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting || isSuccess}
            className="w-full px-4 py-3 glass-effect rounded-xl bg-transparent border border-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-60"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium mb-2">Subject</label>
        <div className="relative">
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={isSubmitting || isSuccess}
            className="w-full px-4 py-3 glass-effect rounded-xl bg-transparent border border-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none cursor-pointer disabled:opacity-60"
          >
            <option value="" disabled className="bg-gray-900">Select a topic</option>
            <optgroup label="Project Inquiry" className="bg-gray-900 font-semibold text-purple-400">
              <option value="New Project" className="bg-gray-900">🚀 New Project</option>
              <option value="Existing Project" className="bg-gray-900">🛠 Existing Project Update</option>
              <option value="Consulting" className="bg-gray-900">💡 Consulting / Advisory</option>
            </optgroup>
            <optgroup label="Career" className="bg-gray-900 font-semibold text-blue-400">
              <option value="Full-time" className="bg-gray-900">💼 Full-time Opportunity</option>
              <option value="Contract" className="bg-gray-900">📜 Contract / Freelance</option>
              <option value="Partnership" className="bg-gray-900">🤝 Partnership</option>
            </optgroup>
            <optgroup label="Technical" className="bg-gray-900 font-semibold text-green-400">
              <option value="System Design" className="bg-gray-900">🏗 System Design Review</option>
              <option value="Code Audit" className="bg-gray-900">🔍 Code Audit</option>
              <option value="Other" className="bg-gray-900">💬 Other</option>
            </optgroup>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={isSubmitting || isSuccess}
          rows={6}
          className="w-full px-4 py-3 glass-effect rounded-xl bg-transparent border border-border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none disabled:opacity-60"
          placeholder="Tell me about your project or inquiry..."
        />
      </div>

      {/* Error message */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
        >
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <span>{errorMsg || 'Failed to send. Please try again or email me directly.'}</span>
        </motion.div>
      )}

      <motion.button
        type="submit"
        id="contact-submit-btn"
        disabled={isSubmitting || isSuccess}
        whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${isSuccess
          ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)]'
          : isError
            ? 'bg-red-500/80 text-white'
            : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-lg hover:shadow-purple-500/25'
          } disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            Sending...
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Message Sent! Check your inbox.
          </>
        ) : isError ? (
          <>
            <AlertCircle className="w-5 h-5" />
            Try Again
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </motion.button>

      {isSuccess && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-green-400/80"
        >
          ✉️ A confirmation email has been sent to <strong>{formData.email}</strong>
        </motion.p>
      )}
    </form>
  )
}
