"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import WalletConnect from "@/components/wallet-connect"
import Dashboard from "@/components/dashboard"
import QuestPanel from "@/components/quest-panel"
import AdminPanel from "@/components/admin-panel"
import Web3Background from "@/components/web3-background"
import Image from "next/image"
import { FloatingElements } from "@/components/enhanced-animations"
import Footer from "@/components/footer"

// Import pages
import ProductPage from "@/components/pages/product"
import AboutPage from "@/components/pages/about"
import DocumentationPage from "@/components/pages/documentation"
import CommunityPage from "@/components/pages/community"
import HeroSection from "@/components/hero-section"

export default function HomePage() {
  const [walletAddress, setWalletAddress] = useState("")
  const [currentView, setCurrentView] = useState<
    "home" | "dashboard" | "admin" | "product" | "about" | "documentation" | "community"
  >("home")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address)
    if (address) {
      setCurrentView("dashboard")
    }
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <div className="space-y-8">
            <Dashboard walletAddress={walletAddress} />
            <QuestPanel walletAddress={walletAddress} />
          </div>
        )
      case "admin":
        return <AdminPanel />
      case "product":
        return <ProductPage onBack={() => setCurrentView("home")} />
      case "about":
        return <AboutPage onBack={() => setCurrentView("home")} />
      case "documentation":
        return <DocumentationPage onBack={() => setCurrentView("home")} />
      case "community":
        return <CommunityPage onBack={() => setCurrentView("home")} />
      default:
        return <HeroSection onConnect={handleWalletConnect} onNavigate={setCurrentView} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <Web3Background />
      <FloatingElements />

      {/* Navigation */}
      <nav className="relative z-10 p-6 flex justify-between items-center backdrop-blur-sm bg-black/20">
        <motion.div
          className="flex items-center cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setCurrentView("home")}
        >
          <div className="relative w-20 h-16">
            <Image src="/images/nero-logo-final.png" alt="NERO Logo" fill className="object-contain" />
          </div>
        </motion.div>

        <div className="flex items-center space-x-4">
          {walletAddress && (
            <>
              <Button
                variant="ghost"
                onClick={() => setCurrentView("dashboard")}
                className="text-green-400 hover:text-green-300"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentView("admin")}
                className="text-yellow-400 hover:text-yellow-300"
              >
                Admin
              </Button>
            </>
          )}
          <WalletConnect onConnect={handleWalletConnect} />
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">{renderCurrentView()}</main>

      {/* Footer - Only show on home page */}
      {currentView === "home" && <Footer onNavigate={setCurrentView} />}
    </div>
  )
}
