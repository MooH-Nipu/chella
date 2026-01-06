"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhotoCollageProps {
  onContinue: () => void
}

interface PhotoPosition {
  top: string
  left: string
  rotate: number
}

interface Photo {
  src: string
  caption: string
  position?: PhotoPosition
}

export function PhotoCollage({ onContinue }: PhotoCollageProps) {
  const [revealedPhotos, setRevealedPhotos] = useState<number[]>([])
  const [photos, setPhotos] = useState<Photo[]>([
    { src: "/photo1.jpeg", caption: "Om Om and Tante Tante" },
    { src: "/photo2.jpeg", caption: "First Date?" },
    { src: "/photo3.jpeg", caption: "Omaaa Kospleyy" },
    { src: "/photo4.jpeg", caption: "Tenxi Enjoyer" },
  ])

  // Generate random positions on mount
  useEffect(() => {
    const generateRandomPosition = (index: number, total: number): PhotoPosition => {
      // Divide screen into zones to avoid too much overlap
      const zonesPerRow = 4
      const zonesPerCol = 2
      const zone = index % (zonesPerRow * zonesPerCol)
      const col = zone % zonesPerRow
      const row = Math.floor(zone / zonesPerRow)
      
      // Base position in zone with some randomness
      const baseLeft = (col * (100 / zonesPerRow)) + (Math.random() * 15)
      const baseTop = (row * (100 / zonesPerCol)) + (Math.random() * 20)
      
      return {
        top: `${Math.max(2, Math.min(75, baseTop))}%`,
        left: `${Math.max(3, Math.min(75, baseLeft))}%`,
        rotate: Math.random() * 24 - 12, // -12 to 12 degrees
      }
    }

    const photosWithPositions = photos.map((photo, i) => ({
      ...photo,
      position: generateRandomPosition(i, photos.length)
    }))

    setPhotos(photosWithPositions)
  }, [])

  const handleReveal = (index: number) => {
    if (!revealedPhotos.includes(index)) {
      setRevealedPhotos([...revealedPhotos, index])
    }
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Looking Back</p>
          <h2 className="text-3xl md:text-4xl font-medium mb-2 text-foreground tracking-tight">Our Memories</h2>
          <p className="text-muted-foreground">Click each envelope to reveal our moments</p>
        </div>

        {/* Scattered Photos Layout - Random positioning */}
        <div className="relative w-full h-[450px] md:h-[500px] mb-8">
          {photos.map((photo, i) => {
            const revealed = revealedPhotos.includes(i)
            // Don't render until positions are generated
            if (!photo.position) return null
            
            return (
              <div 
                key={i} 
                className="absolute w-44 h-52 md:w-64 md:h-80 cursor-pointer perspective z-10 hover:z-50 transition-all duration-300"
                onClick={() => handleReveal(i)}
                style={{
                  top: photo.position.top,
                  left: photo.position.left,
                  transform: revealed ? `rotate(${photo.position.rotate}deg)` : 'rotate(0deg)',
                }}
              >
                {/* Envelope (shown when not revealed) */}
                <div
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    revealed ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
                  }`}
                  style={{
                    transformStyle: revealed ? "preserve-3d" : undefined,
                  }}
                >
                  <div className="w-full h-full bg-card border border-border rounded-lg flex flex-col items-center justify-center hover:bg-accent/50 transition-colors duration-200 shadow-lg">
                    {/* Envelope Body with flap */}
                    <div className={`relative w-16 h-12 md:w-20 md:h-14 envelope ${revealed ? 'open' : ''}`}>
                      <div className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-sm" />

                      {/* Flap */}
                      <div
                        className="flap absolute -top-1 left-0 right-0 h-6 md:h-7 border-l border-r border-t border-primary/20 bg-primary/5"
                        style={{
                          clipPath: "polygon(0 100%, 50% 30%, 100% 100%)",
                        }}
                      />

                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-primary/30 rounded-full" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">Click to open</p>
                  </div>
                </div>

                {/* Photo (revealed) - pop out like paper (polaroid style) */}
                <div
                  className={`absolute inset-0 ${revealed ? 'opacity-100 scale-100 paper-pop' : 'opacity-0 scale-90'} transition-all duration-700 ease-out`}
                  style={{
                    transformStyle: revealed ? "preserve-3d" : undefined,
                  }}
                >
                  <div className="relative w-full h-full">
                    <figure
                      className="w-full h-full bg-card p-3 pb-10 rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                      style={{
                        transform: `rotate(${photo.position.rotate}deg)`,
                      }}
                    >
                      <div className="w-full h-[calc(100%-2.5rem)] overflow-hidden rounded-md bg-secondary/20">
                        <img
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <figcaption className="absolute bottom-3 left-0 right-0 text-center text-xs text-foreground/70 px-2">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center text-lg text-foreground/80 italic mb-6">
          We should take more photos together 📸✨
        </p>

        {revealedPhotos.length === photos.length && (
          <div className="text-center animate-fade-in">
            <Button onClick={onContinue} variant="outline" size="lg" className="px-8 bg-transparent">
              One More Surprise
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
