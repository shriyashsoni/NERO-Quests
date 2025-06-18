"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Web3Background from "./web3-background"
import Image from "next/image"

interface PageLayoutProps {
  title: string
  description: string
  children: React.ReactNode
  onBack?: () => void
}

export default function PageLayout({ title, description, children, onBack }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <Web3Background />

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm bg-black/20">
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-10 h-10">
            <Image src="/images/nero-logo.png" alt="NERO Logo" fill className="object-contain" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            NERO Quests
          </span>
        </motion.div>

        {onBack && (
          <Button onClick={onBack} variant="ghost" className="text-green-400 hover:text-green-300">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        )}
      </nav>

      {/* Page Header */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 max-w-4xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>
      </motion.div>

      {/* Page Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
