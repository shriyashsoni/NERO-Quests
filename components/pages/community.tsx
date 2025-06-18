"use client"

import { motion } from "framer-motion"
import { MessageCircle, Github, Twitter } from "lucide-react"
import { DiscIcon as Discord } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Web3Background from "@/components/web3-background"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { ScrollReveal } from "@/components/enhanced-animations"

interface CommunityPageProps {
  onBack: () => void
}

export default function CommunityPage({ onBack }: CommunityPageProps) {
  const platforms = [
    {
      icon: <Discord className="w-8 h-8" />,
      name: "Discord",
      description: "Join our active community for real-time discussions, support, and updates",
      members: "12,500+",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      icon: <Twitter className="w-8 h-8" />,
      name: "Twitter",
      description: "Follow us for the latest news, announcements, and Web3 gaming insights",
      members: "8,200+",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: <Github className="w-8 h-8" />,
      name: "GitHub",
      description: "Contribute to our open-source projects and explore our codebase",
      members: "1,800+",
      color: "text-gray-400",
      bgColor: "bg-gray-500/10",
      borderColor: "border-gray-500/20",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      name: "Forum",
      description: "In-depth discussions, feature requests, and technical deep-dives",
      members: "5,600+",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
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
          Community
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 max-w-4xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Join our thriving community of developers and gamers. Connect on Discord, follow us on Twitter, contribute on
          GitHub, and participate in hackathons and workshops.
        </motion.p>
      </motion.div>

      {/* Page Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {/* Community Platforms */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <ScrollReveal key={platform.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card
                  className={`${platform.bgColor} ${platform.borderColor} backdrop-blur-sm border transition-all duration-300 hover:shadow-lg h-full`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`${platform.color}`}>{platform.icon}</div>
                        <CardTitle className="text-white">{platform.name}</CardTitle>
                      </div>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {platform.members}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{platform.description}</p>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                      Join {platform.name}
                    </Button>
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
