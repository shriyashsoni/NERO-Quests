"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Wallet3DProps {
  isConnected: boolean
  className?: string
}

export default function Wallet3D({ isConnected, className = "" }: Wallet3DProps) {
  const walletRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wallet = walletRef.current
    if (!wallet) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wallet.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const rotateX = (y / rect.height) * 20
      const rotateY = (x / rect.width) * 20

      wallet.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
    }

    const handleMouseLeave = () => {
      wallet.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)"
    }

    wallet.addEventListener("mousemove", handleMouseMove)
    wallet.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      wallet.removeEventListener("mousemove", handleMouseMove)
      wallet.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      ref={walletRef}
      className={`relative w-16 h-10 transition-all duration-300 ease-out ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Wallet Base */}
      <div
        className={`absolute inset-0 rounded-lg transition-all duration-500 ${
          isConnected
            ? "bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"
            : "bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"
        }`}
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Wallet Front Face */}
        <div className="absolute inset-0 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
          {/* Wallet Details */}
          <div className="absolute top-1 left-1 w-2 h-1 bg-white/30 rounded-sm"></div>
          <div className="absolute top-1 right-1 w-3 h-1 bg-white/20 rounded-sm"></div>
          <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-white/10 rounded-sm"></div>

          {/* Connection Status Indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-gray-400"}`}
              animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </div>
      </div>

      {/* Wallet Side */}
      <div
        className={`absolute top-0 right-0 w-1 h-full rounded-r-lg transition-all duration-500 ${
          isConnected ? "bg-gradient-to-b from-green-500 to-purple-700" : "bg-gradient-to-b from-gray-700 to-gray-900"
        }`}
        style={{ transform: "rotateY(90deg) translateZ(8px)" }}
      />

      {/* Wallet Top */}
      <div
        className={`absolute top-0 left-0 w-full h-1 rounded-t-lg transition-all duration-500 ${
          isConnected ? "bg-gradient-to-r from-green-400 to-blue-500" : "bg-gradient-to-r from-gray-600 to-gray-800"
        }`}
        style={{ transform: "rotateX(90deg) translateZ(5px)" }}
      />

      {/* Glow Effect */}
      {isConnected && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-400/30 via-blue-500/30 to-purple-600/30 blur-md"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          style={{ transform: "translateZ(-5px) scale(1.2)" }}
        />
      )}

      {/* Floating Particles */}
      {isConnected && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}
