"use client"

import { motion } from "framer-motion"
import { Zap, Code, Brain, BarChart3, Gift, Gamepad2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Web3Background from "@/components/web3-background"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { ScrollReveal } from "@/components/enhanced-animations"

interface ProductPageProps {
  onBack: () => void
}

export default function ProductPage({ onBack }: ProductPageProps) {
  const features = [
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Quest Engine",
      description: "Create dynamic on-chain and off-chain quests with real-time validation and customizable triggers.",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Developer SDK",
      description: "Lightweight integration for JavaScript, Unity, and Web3 frameworks with full documentation.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Quest Generator",
      description: "Personalized quests powered by AI that analyzes player behavior and wallet activity.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Real-time insights on user engagement, quest performance, and reward distribution.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "NFT Rewards",
      description: "Instant NFT minting and distribution with customizable rarity and utility features.",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "High Performance",
      description: "Built on NERO Chain for lightning-fast transactions and minimal gas fees.",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <Web3Background />

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm bg-black/20">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-20 h-16">
            <Image src="/images/nero-logo-final.png" alt="NERO Logo" fill className="object-contain" />
          </div>
        </motion.div>

        <Button onClick={onBack} variant="ghost" className="text-green-400 hover:text-green-300">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
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
          Product Suite
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 max-w-4xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Explore our comprehensive suite of tools including Quest Engine, Developer SDK, AI Quest Generator, Analytics
          Dashboard, NFT Rewards system, and high-performance infrastructure built on NERO Chain.
        </motion.p>
      </motion.div>

      {/* Page Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card
                className={`${feature.bgColor} ${feature.borderColor} backdrop-blur-sm border transition-all duration-300 hover:shadow-lg h-full`}
              >
                <CardHeader>
                  <div className={`${feature.color} mb-4 flex justify-center`}>{feature.icon}</div>
                  <CardTitle className="text-white text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-center">{feature.description}</p>
                  <div className="mt-4 flex justify-center">
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      Available Now
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Integration Example */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-green-500/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Quick Integration</h2>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`// Initialize NERO Quests SDK
import { NeroQuests } from '@nero/quests-sdk'

const quests = new NeroQuests({
  apiKey: 'your-api-key',
  chainId: 'nero-mainnet'
})

// Create a quest
await quests.createQuest({
  title: 'Daily Login Streak',
  type: 'daily',
  reward: { xp: 100, nft: 'streak-badge' },
  conditions: [{ type: 'login', count: 7 }]
})

// Listen for quest completion
quests.on('questCompleted', (data) => {
  console.log('Quest completed!', data)
})`}</code>
              </pre>
            </div>
          </motion.div>
        </ScrollReveal>
      </motion.div>
    </div>
  )
}
