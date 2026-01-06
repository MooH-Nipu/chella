import type React from "react"
import type { Metadata } from "next"
import { Crimson_Pro, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const crimson = Crimson_Pro({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-crimson" 
})
const lora = Lora({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora" 
})

export const metadata: Metadata = {
  title: "Happy Birthday! 🎂",
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
      <body className={`antialiased ${crimson.variable} ${lora.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
