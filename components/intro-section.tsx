"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { ChevronDown } from "lucide-react"

interface IntroSectionProps {
  onComplete: () => void
}

export function IntroSection({ onComplete }: IntroSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showButton, setShowButton] = useState(false)

  const introSteps = [
    "I know you're wondering...",
    "What is this all about?",
    "Well, today is a special day",
    "A day to celebrate YOU",
    "So sit back, relax...",
    "And enjoy this little surprise I made for you 💝"
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (currentStep < introSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 2500) // Each line appears after 2.5 seconds

      return () => clearTimeout(timer)
    } else {
      // Show button 1.5 seconds after last text appears
      const buttonTimer = setTimeout(() => {
        setShowButton(true)
      }, 1500)

      return () => clearTimeout(buttonTimer)
    }
  }, [currentStep, introSteps.length])

  const handleContinue = () => {
    setIsVisible(false)
    setTimeout(onComplete, 300)
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center max-w-4xl mx-auto space-y-8">
        {introSteps.map((text, index) => (
          <p
            key={index}
            className={`text-2xl md:text-4xl lg:text-5xl text-foreground transition-all duration-700 font-crimson font-semibold ${
              index <= currentStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            {text}
          </p>
        ))}

        {showButton && (
          <div className="pt-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
            <Button
              onClick={handleContinue}
              size="lg"
              className="group"
            >
              Let's Go!
              <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
