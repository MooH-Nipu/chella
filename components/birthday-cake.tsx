"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface BirthdayCakeProps {
  onContinue: () => void
  onBlowCandles: () => void
}

export function BirthdayCake({ onContinue, onBlowCandles }: BirthdayCakeProps) {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true])
  const [allBlown, setAllBlown] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showBalloons, setShowBalloons] = useState(false)

  const blowCandle = (index: number) => {
    if (!candlesLit[index]) return
    
    const newCandles = [...candlesLit]
    newCandles[index] = false
    setCandlesLit(newCandles)
    
    // Check if all candles are blown
    if (newCandles.every(c => !c)) {
      setAllBlown(true)
      setShowBalloons(true)
      onBlowCandles()
      setTimeout(() => setShowMessage(true), 500)
    }
  }

  const blowAllCandles = () => {
    setCandlesLit([false, false, false, false, false])
    setAllBlown(true)
    setShowBalloons(true)
    onBlowCandles()
    setTimeout(() => setShowMessage(true), 500)
  }

  // Generate balloon positions once (not random each render)
  const balloonData = Array.from({ length: 15 }, (_, i) => ({
    left: 5 + (i * 6),
    delay: i * 0.15,
    duration: 5 + (i % 3),
    color: ['#ff6b9d', '#c44569', '#ffa502', '#6c5ce7', '#00d2d3', '#ff6348', '#a29bfe', '#fd79a8'][i % 8]
  }))

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Balloons Animation - Using CSS transform with inline keyframes */}
      {showBalloons && (
        <>
          <style jsx global>{`
            @keyframes balloonFly {
              0% {
                transform: translateY(0);
                opacity: 1;
              }
              100% {
                transform: translateY(-150vh);
                opacity: 0;
              }
            }
          `}</style>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: 99999,
            }}
          >
            {balloonData.map((balloon, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${balloon.left}%`,
                  bottom: '-120px',
                  width: '45px',
                  height: '55px',
                  animationName: 'balloonFly',
                  animationDuration: `${balloon.duration}s`,
                  animationTimingFunction: 'ease-out',
                  animationDelay: `${balloon.delay}s`,
                  animationFillMode: 'forwards',
                }}
              >
              {/* Balloon body */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: balloon.color,
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  boxShadow: `inset -8px -8px 20px rgba(0,0,0,0.2), inset 8px 8px 20px rgba(255,255,255,0.3), 0 4px 10px rgba(0,0,0,0.2)`,
                  position: 'relative',
                }}
              >
                {/* Shine */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    width: '10px',
                    height: '10px',
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: '50%',
                    filter: 'blur(2px)',
                  }}
                />
              </div>
              {/* Knot */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: balloon.color,
                  filter: 'brightness(0.7)',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  margin: '-4px auto 0',
                }}
              />
              {/* String */}
              <div
                style={{
                  width: '1px',
                  height: '60px',
                  background: '#999',
                  margin: '0 auto',
                }}
              />
            </div>
          ))}
          </div>
        </>
      )}

      <div className="text-center max-w-lg mx-auto relative z-10">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Make A Wish</p>
        <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-2 tracking-tight">
          {allBlown ? "🎉 Happy Birthday! 🎉" : "Blow The Candles"}
        </h2>
        <p className="text-muted-foreground mb-8">
          {allBlown ? "Your wish is on its way!" : "Click each candle to blow it out"}
        </p>

        {/* Cake */}
        <div className="relative mx-auto mb-8">
          {/* Candles */}
          <div className="flex justify-center gap-6 mb-0 relative z-10">
            {candlesLit.map((isLit, i) => (
              <button
                key={i}
                onClick={() => blowCandle(i)}
                className="relative group cursor-pointer transition-transform hover:scale-110"
                disabled={!isLit}
              >
                {/* Flame with realistic animation */}
                {isLit && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-5 h-8">
                    {/* Outer flame */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-90 animate-flame-flicker"
                      style={{
                        background: 'linear-gradient(to top, #ff6b00 0%, #ff8800 30%, #ffaa00 50%, #ffdd00 70%, #ffffaa 100%)',
                        clipPath: 'ellipse(50% 65% at 50% 70%)',
                        filter: 'blur(1px)',
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                    {/* Inner flame */}
                    <div 
                      className="absolute inset-1 rounded-full animate-flame-dance"
                      style={{
                        background: 'linear-gradient(to top, #ff8800 0%, #ffaa00 40%, #ffff88 100%)',
                        clipPath: 'ellipse(40% 55% at 50% 65%)',
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                    {/* Core glow */}
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-3 rounded-full animate-flame-core"
                      style={{
                        background: 'radial-gradient(circle, #ffffee 0%, #ffff88 60%, transparent 100%)',
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  </div>
                )}
                {/* Candle stick */}
                <div className={`w-3 h-12 rounded-t-sm transition-all duration-300 ${
                  isLit 
                    ? "bg-gradient-to-b from-pink-400 to-rose-500" 
                    : "bg-gradient-to-b from-gray-300 to-gray-400"
                }`}>
                  {/* Smoke animation when blown */}
                  {!isLit && (
                    <>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 opacity-50 animate-smoke-rise">
                        <div className="w-2 h-8 bg-gray-400/60 rounded-full blur-sm" />
                      </div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 opacity-30 animate-smoke-rise" style={{ animationDelay: '0.2s' }}>
                        <div className="w-3 h-10 bg-gray-300/40 rounded-full blur-md" />
                      </div>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Cake layers - Colorful pastel design */}
          <div className="relative">
            {/* Top layer - Light pink */}
            <div className="mx-auto w-48 h-8 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-lg border-b-4 border-pink-500">
              <div className="absolute inset-x-4 top-2 h-1 bg-rose-300/50 rounded-full" />
            </div>
            {/* Frosting drips - Lavender/Purple */}
            <div className="mx-auto w-52 h-4 bg-gradient-to-b from-purple-200 to-purple-300 -mt-1 relative">
              <div className="absolute -bottom-2 left-4 w-3 h-4 bg-purple-200 rounded-b-full" />
              <div className="absolute -bottom-3 left-12 w-4 h-5 bg-purple-200 rounded-b-full" />
              <div className="absolute -bottom-2 right-8 w-3 h-4 bg-purple-200 rounded-b-full" />
              <div className="absolute -bottom-4 right-16 w-4 h-6 bg-purple-200 rounded-b-full" />
            </div>
            {/* Middle layer - Lavender/Purple */}
            <div className="mx-auto w-52 h-10 bg-gradient-to-b from-purple-300 to-purple-400 border-b-4 border-purple-500" />
            {/* Bottom layer - Rose/Mauve */}
            <div className="mx-auto w-56 h-12 bg-gradient-to-b from-rose-400 to-rose-500 rounded-b-lg">
              <div className="absolute bottom-2 inset-x-8 h-2 flex justify-around">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-fuchsia-500 rounded-full" />
                ))}
              </div>
            </div>
            {/* Plate */}
            <div className="mx-auto w-64 h-3 bg-gradient-to-b from-gray-200 to-gray-300 rounded-full mt-1 shadow-md" />
          </div>
        </div>

        {/* Blow all button */}
        {!allBlown && candlesLit.some(c => c) && (
          <Button 
            onClick={blowAllCandles} 
            variant="outline" 
            size="lg" 
            className="mb-4 bg-transparent"
          >
            ✨ Blow All Candles
          </Button>
        )}

        {/* Continue after blowing */}
        {showMessage && (
          <div className="animate-fade-in space-y-4">
            <p className="text-lg text-foreground font-medium">
              Now let's see what surprises await you!
            </p>
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
