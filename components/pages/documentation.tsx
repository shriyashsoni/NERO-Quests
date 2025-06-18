"use client"

import { motion } from "framer-motion"
import { Book, Code, Zap, Shield, Puzzle, Rocket } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Web3Background from "@/components/web3-background"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { ScrollReveal } from "@/components/enhanced-animations"

interface DocumentationPageProps {
  onBack: () => void
}

export default function DocumentationPage({ onBack }: DocumentationPageProps) {
  const sections = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Quick Start",
      description: "Get up and running with NERO Quests in under 5 minutes",
      items: ["Installation", "Basic Setup", "First Quest", "Testing"],
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "SDK Reference",
      description: "Complete API documentation for all supported platforms",
      items: ["JavaScript SDK", "Unity Plugin", "React Hooks", "Vue Components"],
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Quest Schemas",
      description: "Learn how to structure and configure different quest types",
      items: ["Daily Quests", "Achievement Quests", "Social Quests", "Custom Logic"],
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Smart Contracts",
      description: "Interact with NERO Chain smart contracts for quest validation",
      items: ["Contract ABIs", "Event Listeners", "Transaction Handling", "Gas Optimization"],
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Advanced Features",
      description: "Unlock the full potential of NERO Quests with advanced configurations",
      items: ["AI Quest Generation", "Custom Rewards", "Analytics Integration", "Webhooks"],
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: "Best Practices",
      description: "Learn from successful implementations and common patterns",
      items: ["Quest Design", "User Experience", "Performance Tips", "Security Guidelines"],
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
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
          Documentation
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 max-w-4xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Get started with detailed technical documentation for integrating NERO Quests. Explore quest schemas, wallet
          setups, event listeners, smart contract APIs, and comprehensive guides.
        </motion.p>
      </motion.div>

      {/* Page Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sections.map((section, index) => (
            <ScrollReveal key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card
                  className={`${section.bgColor} border-green-500/20 backdrop-blur-sm border transition-all duration-300 hover:shadow-lg h-full`}
                >
                  <CardHeader>
                    <div className={`${section.color} mb-2 flex items-center space-x-2`}>
                      {section.icon}
                      <CardTitle className="text-white">{section.title}</CardTitle>
                    </div>
                    <p className="text-gray-400 text-sm">{section.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <div key={item} className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">{item}</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                            Guide
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
