"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Users, TrendingUp, Target, Gift, BarChart3, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

interface AdminQuest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "special"
  difficulty: "easy" | "medium" | "hard"
  xpReward: number
  nftReward?: string
  tokenReward?: number
  isActive: boolean
  completions: number
  category: "defi" | "gaming" | "social" | "trading"
}

export default function AdminPanel() {
  const [quests, setQuests] = useState<AdminQuest[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingQuest, setEditingQuest] = useState<AdminQuest | null>(null)
  const [newQuest, setNewQuest] = useState<Partial<AdminQuest>>({
    title: "",
    description: "",
    type: "daily",
    difficulty: "easy",
    xpReward: 100,
    category: "gaming",
    isActive: true,
  })

  useEffect(() => {
    // Simulate loading admin quests
    const mockQuests: AdminQuest[] = [
      {
        id: "1",
        title: "Daily Login Streak",
        description: "Log in to the platform for 7 consecutive days",
        type: "daily",
        difficulty: "easy",
        xpReward: 100,
        nftReward: "Streak Badge",
        isActive: true,
        completions: 1247,
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
        isActive: true,
        completions: 89,
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
        isActive: false,
        completions: 2341,
        category: "social",
      },
    ]
    setQuests(mockQuests)
  }, [])

  const handleCreateQuest = () => {
    if (newQuest.title && newQuest.description) {
      const quest: AdminQuest = {
        id: Date.now().toString(),
        title: newQuest.title,
        description: newQuest.description,
        type: newQuest.type || "daily",
        difficulty: newQuest.difficulty || "easy",
        xpReward: newQuest.xpReward || 100,
        nftReward: newQuest.nftReward,
        tokenReward: newQuest.tokenReward,
        isActive: newQuest.isActive || true,
        completions: 0,
        category: newQuest.category || "gaming",
      }
      setQuests((prev) => [...prev, quest])
      setNewQuest({
        title: "",
        description: "",
        type: "daily",
        difficulty: "easy",
        xpReward: 100,
        category: "gaming",
        isActive: true,
      })
      setIsCreating(false)
    }
  }

  const handleDeleteQuest = (id: string) => {
    setQuests((prev) => prev.filter((quest) => quest.id !== id))
  }

  const handleToggleActive = (id: string) => {
    setQuests((prev) => prev.map((quest) => (quest.id === id ? { ...quest, isActive: !quest.isActive } : quest)))
  }

  const stats = {
    totalQuests: quests.length,
    activeQuests: quests.filter((q) => q.isActive).length,
    totalCompletions: quests.reduce((sum, q) => sum + q.completions, 0),
    avgCompletionRate: Math.round(quests.reduce((sum, q) => sum + q.completions, 0) / quests.length),
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-400">Manage quests, monitor performance, and configure rewards</p>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-black/40 border-yellow-500/20">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="quests"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            <Target className="w-4 h-4 mr-2" />
            Quest Management
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          >
            <StatCard
              icon={<Target className="w-6 h-6" />}
              title="Total Quests"
              value={stats.totalQuests}
              color="text-blue-400"
              bgColor="bg-blue-500/10"
            />
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Active Quests"
              value={stats.activeQuests}
              color="text-green-400"
              bgColor="bg-green-500/10"
            />
            <StatCard
              icon={<Users className="w-6 h-6" />}
              title="Total Completions"
              value={stats.totalCompletions}
              color="text-purple-400"
              bgColor="bg-purple-500/10"
            />
            <StatCard
              icon={<Gift className="w-6 h-6" />}
              title="Avg Completion Rate"
              value={stats.avgCompletionRate}
              color="text-yellow-400"
              bgColor="bg-yellow-500/10"
            />
          </motion.div>

          <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Daily Login Streak completed</p>
                    <p className="text-sm text-gray-400">User 0x1234...5678 • 2 minutes ago</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">+100 XP</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">New quest created: Trading Master</p>
                    <p className="text-sm text-gray-400">Admin • 1 hour ago</p>
                  </div>
                  <Badge className="bg-blue-500/20 text-blue-400">Quest</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <p className="text-white font-medium">DeFi Explorer quest completed</p>
                    <p className="text-sm text-gray-400">User 0x9876...4321 • 3 hours ago</p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-400">+500 XP</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quests">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Quest Management</h2>
              <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Quest
              </Button>
            </div>

            {isCreating && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Create New Quest</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title" className="text-white">
                          Title
                        </Label>
                        <Input
                          id="title"
                          value={newQuest.title}
                          onChange={(e) => setNewQuest((prev) => ({ ...prev, title: e.target.value }))}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="text-white">
                          Category
                        </Label>
                        <Select
                          value={newQuest.category}
                          onValueChange={(value) => setNewQuest((prev) => ({ ...prev, category: value as any }))}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gaming">Gaming</SelectItem>
                            <SelectItem value="defi">DeFi</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                            <SelectItem value="trading">Trading</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-white">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={newQuest.description}
                        onChange={(e) => setNewQuest((prev) => ({ ...prev, description: e.target.value }))}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="type" className="text-white">
                          Type
                        </Label>
                        <Select
                          value={newQuest.type}
                          onValueChange={(value) => setNewQuest((prev) => ({ ...prev, type: value as any }))}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="special">Special</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="difficulty" className="text-white">
                          Difficulty
                        </Label>
                        <Select
                          value={newQuest.difficulty}
                          onValueChange={(value) => setNewQuest((prev) => ({ ...prev, difficulty: value as any }))}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="xpReward" className="text-white">
                          XP Reward
                        </Label>
                        <Input
                          id="xpReward"
                          type="number"
                          value={newQuest.xpReward}
                          onChange={(e) =>
                            setNewQuest((prev) => ({ ...prev, xpReward: Number.parseInt(e.target.value) }))
                          }
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nftReward" className="text-white">
                          NFT Reward (Optional)
                        </Label>
                        <Input
                          id="nftReward"
                          value={newQuest.nftReward || ""}
                          onChange={(e) => setNewQuest((prev) => ({ ...prev, nftReward: e.target.value }))}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="tokenReward" className="text-white">
                          Token Reward (Optional)
                        </Label>
                        <Input
                          id="tokenReward"
                          type="number"
                          value={newQuest.tokenReward || ""}
                          onChange={(e) =>
                            setNewQuest((prev) => ({ ...prev, tokenReward: Number.parseInt(e.target.value) }))
                          }
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isActive"
                        checked={newQuest.isActive}
                        onCheckedChange={(checked) => setNewQuest((prev) => ({ ...prev, isActive: checked }))}
                      />
                      <Label htmlFor="isActive" className="text-white">
                        Active
                      </Label>
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={handleCreateQuest} className="bg-green-600 hover:bg-green-700">
                        Create Quest
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsCreating(false)}
                        className="border-gray-600 text-gray-300"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="grid gap-4">
              {quests.map((quest) => (
                <motion.div key={quest.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-bold text-white">{quest.title}</h3>
                            <Badge
                              className={
                                quest.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                              }
                            >
                              {quest.isActive ? "Active" : "Inactive"}
                            </Badge>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {quest.type}
                            </Badge>
                            <Badge variant="outline" className="border-gray-600 text-gray-300">
                              {quest.difficulty}
                            </Badge>
                          </div>
                          <p className="text-gray-400 mb-2">{quest.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-green-400">{quest.xpReward} XP</span>
                            {quest.nftReward && <span className="text-purple-400">NFT: {quest.nftReward}</span>}
                            {quest.tokenReward && <span className="text-yellow-400">{quest.tokenReward} Tokens</span>}
                            <span className="text-gray-400">{quest.completions} completions</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch checked={quest.isActive} onCheckedChange={() => handleToggleActive(quest.id)} />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingQuest(quest)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteQuest(quest.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Quest Completion Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quests.map((quest) => (
                      <div key={quest.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{quest.title}</span>
                          <span className="text-white">{quest.completions}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${Math.min((quest.completions / 100) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Daily Active Users</span>
                      <span className="text-2xl font-bold text-purple-400">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Weekly Active Users</span>
                      <span className="text-2xl font-bold text-blue-400">12,394</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Average Session Time</span>
                      <span className="text-2xl font-bold text-green-400">24m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Quest Completion Rate</span>
                      <span className="text-2xl font-bold text-yellow-400">73%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">System Settings</h2>

            <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Reward Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="baseXP" className="text-white">
                      Base XP Multiplier
                    </Label>
                    <Input
                      id="baseXP"
                      type="number"
                      defaultValue="1.0"
                      step="0.1"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tokenRate" className="text-white">
                      Token Reward Rate
                    </Label>
                    <Input
                      id="tokenRate"
                      type="number"
                      defaultValue="0.1"
                      step="0.01"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="autoRewards" defaultChecked />
                  <Label htmlFor="autoRewards" className="text-white">
                    Auto-distribute rewards
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="nftMinting" defaultChecked />
                  <Label htmlFor="nftMinting" className="text-white">
                    Enable NFT minting
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-yellow-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">AI Quest Generation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="aiQuests" defaultChecked />
                  <Label htmlFor="aiQuests" className="text-white">
                    Enable AI-generated quests
                  </Label>
                </div>

                <div>
                  <Label htmlFor="aiFrequency" className="text-white">
                    Generation Frequency
                  </Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="aiModel" className="text-white">
                    AI Model
                  </Label>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  color,
  bgColor,
}: {
  icon: React.ReactNode
  title: string
  value: number
  color: string
  bgColor: string
}) {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className={`${bgColor} border-green-500/20 backdrop-blur-sm`}>
        <CardContent className="p-6 text-center">
          <div className={`${color} mb-3 flex justify-center`}>{icon}</div>
          <div className={`text-3xl font-bold ${color} mb-1`}>{value.toLocaleString()}</div>
          <div className="text-sm text-gray-400">{title}</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
