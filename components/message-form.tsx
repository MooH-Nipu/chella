"use client"

import { useState } from "react"
import { Send, MessageCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import emailjs from '@emailjs/browser'

interface MessageFormProps {
  onSent?: () => void
}

export function MessageForm({ onSent }: MessageFormProps) {
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Check if EmailJS is configured
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey || 
        serviceId === 'your_service_id' || 
        templateId === 'your_template_id' || 
        publicKey === 'your_public_key') {
      setError('EmailJS belum dikonfigurasi. Silakan setup EmailJS terlebih dahulu. Lihat SETUP_EMAIL.md untuk panduan.')
      return
    }

    setIsSending(true)
    setError("")

    try {
      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          message: message,
          to_email: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || '',
          subject: '💌 Birthday Reply'
        },
        publicKey
      )

      setIsSending(false)
      setIsSent(true)
      onSent?.()
    } catch (err: any) {
      console.error('Failed to send email:', err)
      const errorMsg = err?.text || err?.message || 'Failed to send message. Please check your EmailJS configuration.'
      setError(errorMsg)
      setIsSending(false)
    }
  }

  if (isSent) {
    return (
      <Card className="bg-card border border-border p-6 md:p-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-medium text-foreground mb-2">Message Sent! ✨</h3>
        <p className="text-muted-foreground text-sm">
          Your message has been delivered successfully.
        </p>
        <div className="mt-4 flex items-center justify-center gap-1 text-primary">
          <span className="text-sm">Thank you for your message! 💌</span>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-card border border-border p-6 md:p-8">
      <div className="text-center mb-6">
        <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="text-xl font-medium text-foreground mb-2">Write Back To Me</h3>
        <p className="text-sm text-muted-foreground">
          I'd like to hear from you too! Write me something.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
            Your Message <span className="text-primary">*</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something here..."
            rows={5}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <Button 
          type="submit" 
          size="lg" 
          className="w-full"
          disabled={!message.trim() || isSending}
        >
          {isSending ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
