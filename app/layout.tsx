import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NERO Quests - Web3 Quest Engine",
  description: "The ultimate plug-and-play quest engine for Web3 games. Reward, Retain, Repeat.",
  keywords: "Web3, GameFi, Quests, NERO Chain, Blockchain Gaming, NFT Rewards",
  authors: [{ name: "NERO Team" }],
  openGraph: {
    title: "NERO Quests - Web3 Quest Engine",
    description: "Complete Quests. Earn Rewards. Level Up on NERO Chain.",
    type: "website",
    images: ["/images/nero-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NERO Quests - Web3 Quest Engine",
    description: "Complete Quests. Earn Rewards. Level Up on NERO Chain.",
    images: ["/images/nero-logo.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
