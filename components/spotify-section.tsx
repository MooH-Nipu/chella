"use client"

import { Music, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SpotifySectionProps {
  onContinue: () => void
}

export function SpotifySection({ onContinue }: SpotifySectionProps) {
  // Get playlist ID from environment variable
  const spotifyPlaylistId = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID || "2nSqBjy60isnXyZ8wGBStZ"
  const spotifyEmbedUrl = `https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=0`
  const spotifyPlaylistUrl = `https://open.spotify.com/playlist/${spotifyPlaylistId}`
  
  // Generate QR code using a free QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(spotifyPlaylistUrl)}&bgcolor=ffffff&color=000000&margin=10`

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Music className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-medium mb-2 text-foreground tracking-tight">A Playlist For You</h2>
          <p className="text-muted-foreground">Every song here reminds me of you</p>
        </div>

        {/* Side by side layout: Spotify Embed + QR Code */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Spotify Embed - Takes 2 columns */}
          <Card className="bg-card p-4 border border-border overflow-hidden lg:col-span-2">
            <div className="rounded-lg overflow-hidden">
              <iframe
                src={spotifyEmbedUrl}
                width="100%"
                height="400"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
                title="Spotify Playlist"
              />
            </div>
          </Card>

          {/* QR Code - Takes 1 column */}
          <Card className="bg-card p-6 border border-border flex flex-col items-center justify-center">
            <p className="text-sm text-muted-foreground mb-4 text-center">Scan to open in Spotify</p>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <img
                src={qrCodeUrl}
                alt="Spotify Playlist QR Code"
                width={160}
                height={160}
                className="rounded"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Or open the app and search for the playlist
            </p>
          </Card>
        </div>

        {/* Continue button */}
        <div className="text-center">
          <Button onClick={onContinue} variant="outline" size="lg" className="px-8 bg-transparent">
            One Last Thing...
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
