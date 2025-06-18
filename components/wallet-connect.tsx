"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Wallet, LogOut, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Wallet3D from "./wallet-3d"

interface WalletConnectProps {
  onConnect: (address: string) => void
  variant?: "default" | "hero"
}

export default function WalletConnect({ onConnect, variant = "default" }: WalletConnectProps) {
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [balance, setBalance] = useState("0.00")

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        setIsConnecting(true)
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        const address = accounts[0]
        setWalletAddress(address)
        onConnect(address)

        // Simulate getting balance
        setTimeout(() => {
          setBalance("1.234")
        }, 1000)
      } catch (error) {
        console.error("Connection Error:", error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      alert("Please install MetaMask or another Web3 wallet!")
    }
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setBalance("0.00")
    onConnect("")
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        const address = accounts[0] || ""
        setWalletAddress(address)
        onConnect(address)
        if (!address) setBalance("0.00")
      })
    }
  }, [onConnect])

  if (walletAddress) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-3"
      >
        <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm hover:border-green-500/40 transition-all duration-300">
          <CardContent className="p-3 flex items-center space-x-3">
            <Wallet3D isConnected={true} />
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
              <div>
                <div className="text-sm font-medium text-white">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
                <motion.div
                  className="text-xs text-green-400"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  {balance} NERO
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button
          onClick={disconnectWallet}
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </motion.div>
    )
  }

  if (variant === "hero") {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-4">
        <Wallet3D isConnected={false} className="scale-150" />
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg shadow-green-500/25 transition-all duration-300"
        >
          {isConnecting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Zap className="w-5 h-5 mr-2" />
            </motion.div>
          ) : (
            <Wallet className="w-5 h-5 mr-2" />
          )}
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </motion.div>
    )
  }

  return (
    <Button onClick={connectWallet} disabled={isConnecting} className="bg-green-600 hover:bg-green-700 text-white">
      {isConnecting ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Zap className="w-4 h-4 mr-2" />
        </motion.div>
      ) : (
        <Wallet className="w-4 h-4 mr-2" />
      )}
      {isConnecting ? "Connecting..." : "Connect"}
    </Button>
  )
}
