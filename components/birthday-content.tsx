"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { LoveLetter } from "@/components/love-letter"
import { MemoryGame } from "@/components/memory-game"
import { PhotoCollage } from "@/components/photo-collage"
import { SpotifySection } from "@/components/spotify-section"
import { FinalSection } from "@/components/final-section"
import { BirthdayCake } from "@/components/birthday-cake"
import { Confetti } from "@/components/confetti"
import { MusicToggle } from "@/components/music-toggle"

export function BirthdayContent() {
  const [currentSection, setCurrentSection] = useState(0)
  const [maxUnlocked, setMaxUnlocked] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displaySection, setDisplaySection] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isReplay, setIsReplay] = useState(false)

  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 6000)
  }

  const goToSection = (index: number) => {
    if (index === currentSection || isTransitioning) return
    setIsTransitioning(true)
    // After fade out, switch section
    setTimeout(() => {
      setDisplaySection(index)
      setCurrentSection(index)
      // Allow fade in to complete
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 400)
  }

  const handleReset = () => {
    setIsReplay(true)
    setIsTransitioning(true)
    setTimeout(() => {
      setDisplaySection(0)
      setCurrentSection(0)
      setMaxUnlocked(0)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 400)
  }

  // On replay, cake goes directly to letter (skipping game)
  const sections = [
    { id: "hero", component: <HeroSection onContinue={() => { setMaxUnlocked((m) => Math.max(m, 1)); goToSection(1) }} /> },
    { id: "cake", component: <BirthdayCake onContinue={() => { 
      if (isReplay) {
        // Skip game on replay, go to letter
        setMaxUnlocked((m) => Math.max(m, 3)); 
        goToSection(3)
      } else {
        setMaxUnlocked((m) => Math.max(m, 2)); 
        goToSection(2)
      }
    }} onBlowCandles={triggerConfetti} /> },
    { id: "game", component: <MemoryGame onContinue={() => { setMaxUnlocked((m) => Math.max(m, 3)); goToSection(3) }} /> },
    { id: "letter", component: <LoveLetter onContinue={() => { setMaxUnlocked((m) => Math.max(m, 4)); goToSection(4) }} /> },
    { id: "photos", component: <PhotoCollage onContinue={() => { setMaxUnlocked((m) => Math.max(m, 5)); goToSection(5) }} /> },
    { id: "spotify", component: <SpotifySection onContinue={() => { setMaxUnlocked((m) => Math.max(m, 6)); goToSection(6) }} /> },
    { id: "final", component: <FinalSection onReset={handleReset} /> },
  ]

  // Prevent manually jumping ahead: only allow nav to go to unlocked sections
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Confetti overlay */}
      <Confetti isActive={showConfetti} />
      
      {/* Music toggle button */}
      <MusicToggle />

      {/* Skip button (temporary for testing) */}
      <button
        onClick={() => {
          const next = currentSection + 1
          if (next < sections.length) {
            setMaxUnlocked((m) => Math.max(m, next))
            goToSection(next)
          }
        }}
        className="fixed top-6 right-6 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:opacity-80 transition-opacity"
      >
        Skip →
      </button>

      <div
        className={`transition-all duration-500 ease-in-out transform ${
          isTransitioning
            ? "opacity-0 translate-y-4 scale-[0.98]"
            : "opacity-100 translate-y-0 scale-100"
        }`}
      >
        {sections[displaySection].component}
      </div>
    </div>
  )
}
