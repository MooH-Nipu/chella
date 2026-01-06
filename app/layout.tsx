import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Quicksand } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const _quicksand = Quicksand({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Happy Birthday! 🎂",
  description: "A special birthday surprise just for you",
  generator: 'v0.app',
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_playfair.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
