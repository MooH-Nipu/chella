"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  onContinue: () => void
}

export function HeroSection({ onContinue }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">A Special Day</p>

        <h1 className="text-5xl md:text-6xl font-medium text-foreground mb-6 tracking-tight text-balance">
          Happy Birthday
        </h1>

        <p className="text-lg text-muted-foreground mb-12 leading-relaxed text-pretty max-w-md mx-auto">
          Today is all about celebrating you. I made this little corner of the internet just for you.
        </p>

        <Button onClick={onContinue} size="lg" className="px-8">
          Open Your Surprise
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  )
}
