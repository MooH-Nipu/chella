"use client"

import { MessageForm } from "@/components/message-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

interface FinalSectionProps {
  onReset?: () => void
}

export function FinalSection({ onReset }: FinalSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 pb-24">
      <div className="w-full max-w-lg mx-auto">
        {/* Message Form */}
        <div className="mb-8">
          <MessageForm />
        </div>

        {/* Final message */}
        <Card className="bg-secondary/50 p-6 border-none text-center">
          <h3 className="text-xl font-medium mb-3 text-foreground">Happy Birthday Once More</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I hope this little surprise brought a smile to your face. You deserve all the happiness in the world.
          </p>
          <p className="text-primary text-sm mt-4">Always and forever 💝</p>
        </Card>

        {/* Reset button */}
        {onReset && (
          <div className="text-center mt-8">
            <Button 
              onClick={onReset} 
              variant="ghost" 
              size="lg" 
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              I want to see this from the start
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
