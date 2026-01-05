"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/background-music.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.3
    
    audioRef.current.addEventListener("canplaythrough", () => {
      setIsLoaded(true)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked, user needs to interact first
        console.log("Autoplay blocked")
      })
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
      aria-label={isPlaying ? "Mute music" : "Play music"}
      title={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-foreground animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
      
      {/* Sound waves animation when playing */}
      {isPlaying && (
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
        </div>
      )}
    </button>
  )
}
