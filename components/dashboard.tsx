"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Zap, Gift, Star, TrendingUp, Target, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface DashboardProps {
  walletAddress: string
}

export default function Dashboard({ walletAddress }: DashboardProps) {
  const [stats, setStats] = useState({
    questsCompleted: 0,
    xpEarned: 0,
    nftsClaimed: 0,
    currentLevel: 0,
    xpToNextLevel: 0,
    totalXpForNextLevel: 1000,
    streak: 0,
    rank: 0,
  })

  useEffect(() => {
    // Simulate loading user stats
    const timer = setTimeout(() => {
      setStats({
        questsCompleted: 47,
        xpEarned: 3420,
        nftsClaimed: 12,
        currentLevel: 8,
        xpToNextLevel: 580,
        totalXpForNextLevel: 1000,
        streak: 7,
        rank: 156,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Quest Dashboard
        </h1>
        <p className="text-gray-400">
          Welcome back, Quester! {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
        </p>
      </motion.div>

      {/* Level Progress */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
        <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Level {stats.currentLevel}</h3>
                  <p className="text-gray-400">Quest Master</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                Rank #{stats.rank}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress to Level {stats.currentLevel + 1}</span>
                <span className="text-white">
                  {stats.xpToNextLevel}/{stats.totalXpForNextLevel} XP
                </span>
              </div>
              <Progress value={(stats.xpToNextLevel / stats.totalXpForNextLevel) * 100} className="h-3 bg-gray-700" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            icon={<Target className="w-6 h-6" />}
            title="Quests Completed"
            value={stats.questsCompleted}
            color="text-blue-400"
            bgColor="bg-blue-500/10"
            borderColor="border-blue-500/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            icon={<Zap className="w-6 h-6" />}
            title="XP Earned"
            value={stats.xpEarned}
            color="text-green-400"
            bgColor="bg-green-500/10"
            borderColor="border-green-500/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            icon={<Gift className="w-6 h-6" />}
            title="NFTs Claimed"
            value={stats.nftsClaimed}
            color="text-purple-400"
            bgColor="bg-purple-500/10"
            borderColor="border-purple-500/20"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Day Streak"
            value={stats.streak}
            color="text-orange-400"
            bgColor="bg-orange-500/10"
            borderColor="border-orange-500/20"
          />
        </motion.div>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <AchievementItem
                title="First Quest Master"
                description="Completed your first quest"
                time="2 hours ago"
                rarity="Common"
              />
              <AchievementItem
                title="NFT Collector"
                description="Claimed 10 unique NFTs"
                time="1 day ago"
                rarity="Rare"
              />
              <AchievementItem
                title="Streak Warrior"
                description="Maintained a 7-day quest streak"
                time="3 days ago"
                rarity="Epic"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  color,
  bgColor,
  borderColor,
}: {
  icon: React.ReactNode
  title: string
  value: number
  color: string
  bgColor: string
  borderColor: string
}) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={`${bgColor} ${borderColor} backdrop-blur-sm border transition-all duration-300 hover:shadow-lg`}>
        <CardContent className="p-6 text-center">
          <div className={`${color} mb-3 flex justify-center`}>{icon}</div>
          <div className={`text-3xl font-bold ${color} mb-1`}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {value.toLocaleString()}
            </motion.span>
          </div>
          <div className="text-sm text-gray-400">{title}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AchievementItem({
  title,
  description,
  time,
  rarity,
}: {
  title: string
  description: string
  time: string
  rarity: string
}) {
  const rarityColors = {
    Common: "text-gray-400 bg-gray-500/20",
    Rare: "text-blue-400 bg-blue-500/20",
    Epic: "text-purple-400 bg-purple-500/20",
    Legendary: "text-yellow-400 bg-yellow-500/20",
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-white">{title}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <Badge className={rarityColors[rarity as keyof typeof rarityColors]}>{rarity}</Badge>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  )
}
