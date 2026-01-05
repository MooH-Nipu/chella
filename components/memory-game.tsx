"use client"

import { useState, useEffect } from "react"
import { RotateCcw, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MemoryGameProps {
  onContinue: () => void
}

const cardSymbols = ["A", "B", "C", "D", "E", "F", "G", "H"]

export function MemoryGame({ onContinue }: MemoryGameProps) {
  const [cards, setCards] = useState<{ id: number; symbol: string; isFlipped: boolean; isMatched: boolean }[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const initializeGame = () => {
    const shuffledCards = [...cardSymbols, ...cardSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setIsComplete(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards.find((c) => c.id === first)
      const secondCard = cards.find((c) => c.id === second)

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isMatched: true } : card)),
          )
          setFlippedCards([])
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 800)
      }
      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsComplete(true)
    }
  }, [cards])

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return
    const card = cards.find((c) => c.id === id)
    if (!card || card.isFlipped || card.isMatched) return

    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)))
    setFlippedCards((prev) => [...prev, id])
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md mx-auto w-full text-center">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">A Little Game</p>
        <h2 className="text-3xl md:text-4xl font-medium mb-2 text-foreground tracking-tight">Memory Match</h2>
        <p className="text-muted-foreground mb-8">Find all the matching pairs</p>

        <Card className="bg-card p-4 md:p-6 border border-border mb-6">
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
                className={`aspect-square rounded-md text-lg md:text-xl font-medium transition-all duration-200 ${
                  card.isFlipped || card.isMatched
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                } ${card.isMatched ? "opacity-60" : ""}`}
              >
                {card.isFlipped || card.isMatched ? card.symbol : ""}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <span>Moves: {moves}</span>
            <Button variant="ghost" size="sm" onClick={initializeGame} className="h-8 px-3">
              <RotateCcw className="w-3 h-3 mr-2" />
              Reset
            </Button>
          </div>
        </Card>

        {isComplete && (
          <div className="space-y-4">
            <p className="text-foreground font-medium">Well done! You completed it in {moves} moves.</p>
            <Button onClick={onContinue} size="lg" className="px-8">
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
