"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LoveLetterProps {
  onContinue: () => void
}

// Typing animation hook
function useTypingEffect(text: string, isActive: boolean, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setDisplayedText("")
      setIsComplete(false)
      return
    }

    let index = 0
    setDisplayedText("")
    setIsComplete(false)

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, isActive, speed])

  return { displayedText, isComplete }
}

export function LoveLetter({ onContinue }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentParagraph, setCurrentParagraph] = useState(0)

  const paragraphs = [
    { text: "My Dearest,", isItalic: true, delay: 0 },
    { text: "On this special day, I wanted to take a moment to tell you just how much you mean to me. Words can never fully capture what I feel, but I will try anyway.", delay: 500 },
    { text: "You are the sunshine that brightens my darkest days, the laughter that echoes in my heart, and the peace I find when the world feels chaotic. Every moment with you is a gift I treasure.", delay: 0 },
    { text: "Your smile has the power to make everything better. Your kindness inspires me to be a better person. Your presence in my life is something I will never take for granted.", delay: 0 },
    { text: "I hope this year brings you all the happiness, love, and success you deserve. May all your dreams come true, and may you always know how incredibly special you are.", delay: 0 },
    { text: "Happy Birthday, my love. Here is to celebrating you today and always.", delay: 0 },
  ]

  const { displayedText, isComplete } = useTypingEffect(
    paragraphs[currentParagraph]?.text || "",
    isOpen && currentParagraph < paragraphs.length,
    25
  )

  useEffect(() => {
    if (isComplete && currentParagraph < paragraphs.length - 1) {
      const timer = setTimeout(() => {
        setCurrentParagraph(prev => prev + 1)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [isComplete, currentParagraph, paragraphs.length])

  const allComplete = currentParagraph === paragraphs.length - 1 && isComplete

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-xl mx-auto w-full">
        <p className="text-sm uppercase tracking-widest text-muted-foreground text-center mb-3">From Me</p>
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-8 text-foreground tracking-tight">
          A Letter For You
        </h2>

        <Card
          className={`bg-card border border-border transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-[2000px]" : "max-h-28"
          }`}
        >
          <div className="p-6 md:p-8">
            {!isOpen ? (
              <button
                onClick={() => setIsOpen(true)}
                className="w-full text-center py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-sm">Click to open</span>
                <ChevronDown className="w-5 h-5 mx-auto mt-2 animate-bounce" />
              </button>
            ) : (
              <div className="space-y-5 text-foreground leading-relaxed min-h-[300px]">
                {/* Rendered paragraphs */}
                {paragraphs.slice(0, currentParagraph).map((para, idx) => (
                  <p 
                    key={idx} 
                    className={`text-muted-foreground animate-fade-in ${para.isItalic ? 'text-sm italic' : ''}`}
                  >
                    {para.text}
                  </p>
                ))}
                
                {/* Currently typing paragraph */}
                {currentParagraph < paragraphs.length && (
                  <p className={`text-muted-foreground ${paragraphs[currentParagraph].isItalic ? 'text-sm italic' : ''}`}>
                    {displayedText}
                    <span className="inline-block w-0.5 h-4 bg-primary ml-1 animate-blink" />
                  </p>
                )}

                {/* Signature - shows after all paragraphs */}
                {allComplete && (
                  <p className="text-right text-sm text-muted-foreground pt-4 animate-fade-in">
                    Forever yours,
                    <br />
                    <span className="text-foreground">[Your Name]</span>
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>

        {allComplete && (
          <div className="text-center mt-8 animate-fade-in">
            <Button onClick={onContinue} variant="outline" size="lg" className="px-8 bg-transparent">
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
