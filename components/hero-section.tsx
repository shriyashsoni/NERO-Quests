"use client"

import { motion } from "framer-motion"
import { Sparkles, Gamepad2, Trophy, Zap, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import WalletConnect from "@/components/wallet-connect"
import { ScrollReveal, PulseGlow, TypewriterText } from "@/components/enhanced-animations"
import Image from "next/image"

interface HeroSectionProps {
  onConnect: (address: string) => void
  onNavigate: (view: string) => void
}

export default function HeroSection({ onConnect, onNavigate }: HeroSectionProps) {
  return (
    <div className="container mx-auto px-6 py-12 relative z-10">
      {/* Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
        {/* Left Column - Hero Text */}
        <div className="space-y-8">
          <ScrollReveal>
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Unleash the Power of
              </span>
              <br />
              <TypewriterText
                text="Web3 Quests"
                className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
              />
            </motion.h1>
          </ScrollReveal>

          <ScrollReveal className="delay-200">
            <motion.p
              className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The ultimate plug-and-play quest engine for Web3 gaming. Create engaging quests, reward players with NFTs,
              and boost retention with AI-powered experiences.
            </motion.p>
          </ScrollReveal>

          <ScrollReveal className="delay-400">
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <WalletConnect onConnect={onConnect} variant="hero" />
              <Button
                variant="ghost"
                onClick={() => onNavigate("product")}
                className="text-green-400 hover:text-green-300 text-lg px-8 py-4"
              >
                Explore Features
              </Button>
            </motion.div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal className="delay-600">
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-gray-400 text-sm">Games Integrated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">1M+</div>
                <div className="text-gray-400 text-sm">Quests Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Right Column - Hero Image */}
        <div className="relative">
          <ScrollReveal>
            <motion.div
              className="relative w-full h-[600px] rounded-3xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm" />

              {/* Hero Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full max-w-lg">
                  <Image
                    src="/images/hero-image.png"
                    alt="NERO Quests Platform"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-green-400/30 rounded-full animate-pulse" />
              <div
                className="absolute top-3/4 right-1/4 w-8 h-8 bg-blue-400/30 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-400/30 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="rgba(0, 255, 163, 0.3)" strokeWidth="2" />
                <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="2" />
                <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="rgba(157, 78, 221, 0.3)" strokeWidth="2" />
                <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="rgba(247, 37, 133, 0.3)" strokeWidth="2" />
              </svg>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ScrollReveal className="delay-700">
          <PulseGlow>
            <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm hover:border-green-500/40 transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <Sparkles className="w-12 h-12 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Quests</h3>
                <p className="text-gray-400 leading-relaxed">
                  Generate personalized quests that adapt to player behavior and create unique gaming experiences.
                </p>
              </CardContent>
            </Card>
          </PulseGlow>
        </ScrollReveal>

        <ScrollReveal className="delay-800">
          <PulseGlow color="blue">
            <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <Gamepad2 className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Seamless Integration</h3>
                <p className="text-gray-400 leading-relaxed">
                  Integrate with any Web3 game engine in minutes using our comprehensive SDK and documentation.
                </p>
              </CardContent>
            </Card>
          </PulseGlow>
        </ScrollReveal>

        <ScrollReveal className="delay-900">
          <PulseGlow color="purple">
            <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <Trophy className="w-12 h-12 text-purple-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">NFT Rewards</h3>
                <p className="text-gray-400 leading-relaxed">
                  Reward players with unique NFTs for completing quests and achieving milestones.
                </p>
              </CardContent>
            </Card>
          </PulseGlow>
        </ScrollReveal>

        <ScrollReveal className="delay-1000">
          <PulseGlow color="yellow">
            <Card className="bg-black/40 border-yellow-500/20 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">High Performance</h3>
                <p className="text-gray-400 leading-relaxed">
                  Built on NERO Chain for lightning-fast transactions and minimal gas fees.
                </p>
              </CardContent>
            </Card>
          </PulseGlow>
        </ScrollReveal>

        <ScrollReveal className="delay-1100">
          <PulseGlow color="green">
            <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm hover:border-green-500/40 transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Secure & Reliable</h3>
                <p className="text-gray-400 leading-relaxed">
                  Enterprise-grade security with 99.9% uptime and comprehensive audit trails.
                </p>
              </CardContent>
            </Card>
          </PulseGlow>
        </ScrollReveal>

        <ScrollReveal className="delay-1200">
          <PulseGlow color="blue">
            <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Community Driven</h3>
                <p className="text-gray-400 leading-relaxed">
                  Join a thriving community of developers and gamers building the future of Web3 gaming.
                </p>
              </CardContent>
            </Card>
          </PulseGlow>
        </ScrollReveal>
      </div>
    </div>
  )
}
