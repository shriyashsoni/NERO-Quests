"use client"

import { motion } from "framer-motion"
import { Users, Target, Rocket, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Web3Background from "@/components/web3-background"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { ScrollReveal } from "@/components/enhanced-animations"

interface AboutPageProps {
  onBack: () => void
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Mission-Driven",
      description: "Solving Web3's biggest challenge: user retention through meaningful quests.",
      color: "text-green-400",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community-First",
      description: "Built by gamers, for gamers. Every feature is designed with the community in mind.",
      color: "text-blue-400",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Innovation",
      description: "Pushing the boundaries of what's possible in Web3 gaming and quest systems.",
      color: "text-purple-400",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion",
      description: "We believe in the transformative power of blockchain gaming and decentralized experiences.",
      color: "text-pink-400",
    },
  ]

  const team = [
    { name: "Alex Chen", role: "CEO & Co-Founder", background: "Former Riot Games, Web3 Gaming Pioneer" },
    { name: "Sarah Kim", role: "CTO & Co-Founder", background: "Ex-Ethereum Foundation, Blockchain Architect" },
    { name: "Marcus Rodriguez", role: "Head of Product", background: "Former Unity Technologies, Game Design Expert" },
    { name: "Emily Zhang", role: "Lead AI Engineer", background: "Ex-OpenAI, Machine Learning Specialist" },
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
          About NERO Quests
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 max-w-4xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Learn about our mission to solve Web3's biggest challenge: user retention. Meet our team of gaming veterans,
          blockchain experts, and AI specialists building the future of Web3 gaming.
        </motion.p>
      </motion.div>

      {/* Page Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Mission Statement */}
        <ScrollReveal>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We believe that Web3 gaming has the potential to revolutionize how players interact with digital worlds.
              However, the current ecosystem struggles with user retention and meaningful engagement. NERO Quests
              bridges this gap by providing developers with powerful, AI-driven tools to create compelling quest
              experiences that keep players coming back for more.
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <ScrollReveal key={value.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`${value.color} mb-4 flex justify-center`}>{value.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Team Section */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">Meet the Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-green-400 font-medium">{member.role}</p>
                          <p className="text-gray-400 text-sm mt-1">{member.background}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Company Stats */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">2024</div>
              <div className="text-gray-400">Founded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-400">Games Integrated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">1M+</div>
              <div className="text-gray-400">Quests Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </motion.div>
        </ScrollReveal>
      </motion.div>
    </div>
  )
}
