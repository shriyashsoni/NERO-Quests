"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Clock, Gift, Zap, Star, CheckCircle, Trophy, Coins } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QuestPanelProps {
  walletAddress: string
}

interface Quest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "special"
  difficulty: "easy" | "medium" | "hard"
  xpReward: number
  nftReward?: string
  tokenReward?: number
  timeLimit: string
  progress: number
  maxProgress: number
  status: "available" | "active" | "completed"
  category: "defi" | "gaming" | "social" | "trading"
}

export default function QuestPanel({ walletAddress }: QuestPanelProps) {
  const [quests, setQuests] = useState<Quest[]>([])
  const [activeTab, setActiveTab] = useState("available")
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)

  useEffect(() => {
    // Simulate loading quests
    const mockQuests: Quest[] = [
      {
        id: "1",
        title: "Daily Login Streak",
        description: "Log in to the platform for 7 consecutive days",
        type: "daily",
        difficulty: "easy",
        xpReward: 100,
        nftReward: "Streak Badge",
        timeLimit: "24h",
        progress: 5,
        maxProgress: 7,
        status: "active",
        category: "gaming",
      },
      {
        id: "2",
        title: "DeFi Explorer",
        description: "Stake 100 NERO tokens in the liquidity pool",
        type: "weekly",
        difficulty: "medium",
        xpReward: 500,
        tokenReward: 10,
        timeLimit: "7d",
        progress: 0,
        maxProgress: 100,
        status: "available",
        category: "defi",
      },
      {
        id: "3",
        title: "Social Butterfly",
        description: "Follow NERO on Twitter and retweet our latest post",
        type: "special",
        difficulty: "easy",
        xpReward: 50,
        nftReward: "Social NFT",
        timeLimit: "∞",
        progress: 1,
        maxProgress: 2,
        status: "active",
        category: "social",
      },
      {
        id: "4",
        title: "Trading Master",
        description: "Complete 5 successful trades on NERO DEX",
        type: "weekly",
        difficulty: "hard",
        xpReward: 1000,
        tokenReward: 50,
        timeLimit: "7d",
        progress: 0,
        maxProgress: 5,
        status: "available",
        category: "trading",
      },
    ]
    setQuests(mockQuests)
  }, [])

  const startQuest = (questId: string) => {
    setQuests((prev) => prev.map((quest) => (quest.id === questId ? { ...quest, status: "active" as const } : quest)))
  }

  const claimReward = (questId: string) => {
    setQuests((prev) =>
      prev.map((quest) => (quest.id === questId ? { ...quest, status: "completed" as const } : quest)),
    )
  }

  const filteredQuests = quests.filter((quest) => {
    switch (activeTab) {
      case "active":
        return quest.status === "active"
      case "completed":
        return quest.status === "completed"
      default:
        return quest.status === "available"
    }
  })

  return (
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Available Quests</h2>
        <p className="text-gray-400">Complete quests to earn XP, NFTs, and tokens</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="bg-black/40 border-green-500/20">
          <TabsTrigger
            value="available"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            Available ({quests.filter((q) => q.status === "available").length})
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Active ({quests.filter((q) => q.status === "active").length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            Completed ({quests.filter((q) => q.status === "completed").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredQuests.map((quest) => (
                <motion.div
                  key={quest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <QuestCard
                    quest={quest}
                    onStart={() => startQuest(quest.id)}
                    onClaim={() => claimReward(quest.id)}
                    onSelect={() => setSelectedQuest(quest)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Quest Detail Modal */}
      <AnimatePresence>
        {selectedQuest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedQuest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-green-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <QuestDetail
                quest={selectedQuest}
                onClose={() => setSelectedQuest(null)}
                onStart={() => {
                  startQuest(selectedQuest.id)
                  setSelectedQuest(null)
                }}
                onClaim={() => {
                  claimReward(selectedQuest.id)
                  setSelectedQuest(null)
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function QuestCard({
  quest,
  onStart,
  onClaim,
  onSelect,
}: {
  quest: Quest
  onStart: () => void
  onClaim: () => void
  onSelect: () => void
}) {
  const difficultyColors = {
    easy: "text-green-400 bg-green-500/20",
    medium: "text-yellow-400 bg-yellow-500/20",
    hard: "text-red-400 bg-red-500/20",
  }

  const categoryIcons = {
    defi: <Coins className="w-4 h-4" />,
    gaming: <Trophy className="w-4 h-4" />,
    social: <Star className="w-4 h-4" />,
    trading: <Zap className="w-4 h-4" />,
  }

  return (
    <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm hover:border-green-500/40 transition-all duration-300 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {categoryIcons[quest.category]}
            <CardTitle className="text-lg text-white">{quest.title}</CardTitle>
          </div>
          <Badge className={difficultyColors[quest.difficulty]}>{quest.difficulty}</Badge>
        </div>
        <p className="text-sm text-gray-400 mt-2">{quest.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar */}
        {quest.status === "active" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">
                {quest.progress}/{quest.maxProgress}
              </span>
            </div>
            <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-2 bg-gray-700" />
          </div>
        )}

        {/* Rewards */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-green-400">
              <Zap className="w-4 h-4" />
              <span>{quest.xpReward} XP</span>
            </div>
            {quest.nftReward && (
              <div className="flex items-center space-x-1 text-purple-400">
                <Gift className="w-4 h-4" />
                <span>NFT</span>
              </div>
            )}
            {quest.tokenReward && (
              <div className="flex items-center space-x-1 text-yellow-400">
                <Coins className="w-4 h-4" />
                <span>{quest.tokenReward}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{quest.timeLimit}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {quest.status === "available" && (
            <Button onClick={onStart} className="w-full bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Start Quest
            </Button>
          )}
          {quest.status === "active" && quest.progress >= quest.maxProgress && (
            <Button onClick={onClaim} className="w-full bg-purple-600 hover:bg-purple-700">
              <Gift className="w-4 h-4 mr-2" />
              Claim Reward
            </Button>
          )}
          {quest.status === "active" && quest.progress < quest.maxProgress && (
            <Button
              onClick={onSelect}
              variant="outline"
              className="w-full border-green-500/20 text-green-400 hover:bg-green-500/10"
            >
              View Progress
            </Button>
          )}
          {quest.status === "completed" && (
            <Button disabled className="w-full bg-gray-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function QuestDetail({
  quest,
  onClose,
  onStart,
  onClaim,
}: {
  quest: Quest
  onClose: () => void
  onStart: () => void
  onClaim: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <h3 className="text-2xl font-bold text-white">{quest.title}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          ×
        </Button>
      </div>

      <p className="text-gray-300">{quest.description}</p>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-500/10 rounded-lg">
            <Zap className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-400">{quest.xpReward}</div>
            <div className="text-xs text-gray-400">XP Reward</div>
          </div>
          {quest.tokenReward && (
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
              <Coins className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-yellow-400">{quest.tokenReward}</div>
              <div className="text-xs text-gray-400">NERO Tokens</div>
            </div>
          )}
        </div>

        {quest.nftReward && (
          <div className="text-center p-3 bg-purple-500/10 rounded-lg">
            <Gift className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-purple-400">{quest.nftReward}</div>
            <div className="text-xs text-gray-400">NFT Reward</div>
          </div>
        )}
      </div>

      {quest.status === "available" && (
        <Button onClick={onStart} className="w-full bg-green-600 hover:bg-green-700">
          <Play className="w-4 h-4 mr-2" />
          Start Quest
        </Button>
      )}

      {quest.status === "active" && quest.progress >= quest.maxProgress && (
        <Button onClick={onClaim} className="w-full bg-purple-600 hover:bg-purple-700">
          <Gift className="w-4 h-4 mr-2" />
          Claim Reward
        </Button>
      )}
    </div>
  )
}
