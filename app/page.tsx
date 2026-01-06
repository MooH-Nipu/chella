"use client"

import { useState, useEffect } from "react"
import { CountdownReveal } from "@/components/countdown-reveal"
import { IntroSection } from "@/components/intro-section"
import { BirthdayContent } from "@/components/birthday-content"

export default function BirthdayPage() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [targetDate, setTargetDate] = useState<Date | null>(null)

  useEffect(() => {
    setMounted(true)

    const dateString = process.env.NEXT_PUBLIC_BIRTHDAY_DATE
    let date: Date

    if (dateString) {
      date = new Date(dateString)
    } else {
      // Fallback: 7 days from now if no env is set
      date = new Date()
      date.setDate(date.getDate() + 7)
    }

    setTargetDate(date)

    // Don't auto-skip - let CountdownReveal component handle the reveal timing
  }, [])

  if (!mounted || !targetDate) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      {!showIntro && !isRevealed ? (
        <CountdownReveal targetDate={targetDate} onReveal={() => setShowIntro(true)} />
      ) : showIntro && !isRevealed ? (
        <IntroSection onComplete={() => setIsRevealed(true)} />
      ) : (
        <BirthdayContent />
      )}
    </main>
  )
}
