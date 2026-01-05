"use client"

import { useState, useEffect } from "react"
import { Gift } from "lucide-react"

interface CountdownRevealProps {
  targetDate: Date
  onReveal: () => void
}

export function CountdownReveal({ targetDate, onReveal }: CountdownRevealProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference <= 0) {
        onReveal()
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
      setHasCalculated(true)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate, onReveal])

  useEffect(() => {
    if (hasCalculated && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      setTimeout(() => {
        setIsVisible(false)
        setTimeout(onReveal, 300)
      }, 500)
    }
  }, [timeLeft, onReveal, hasCalculated])

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center max-w-2xl mx-auto">
        <Gift className="w-12 h-12 text-primary mx-auto mb-8" />

        <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-3 tracking-tight">Something Special</h1>
        <p className="text-lg text-muted-foreground mb-16">is coming for you...</p>

        <div className="grid grid-cols-4 gap-3 md:gap-4 mb-16">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((item, i) => (
            <div key={i} className="bg-card rounded-lg p-4 md:p-6 border border-border">
              <div className="text-3xl md:text-4xl font-medium text-foreground mb-1 tabular-nums">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
