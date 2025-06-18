"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Floating Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <div
            className={`w-4 h-4 ${
              i % 3 === 0
                ? "bg-green-400/20 rotate-45"
                : i % 3 === 1
                  ? "bg-blue-400/20 rounded-full"
                  : "bg-purple-400/20"
            }`}
          />
        </motion.div>
      ))}

      {/* Glowing Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-32 h-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? "rgba(0, 255, 163, 0.1)" : "rgba(0, 212, 255, 0.1)"
            } 0%, transparent 70%)`,
            left: `${15 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [-50, 50, -50],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  )
}

export function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

export function PulseGlow({ children, color = "green" }: { children: React.ReactNode; color?: string }) {
  const colors = {
    green: "shadow-green-500/50",
    blue: "shadow-blue-500/50",
    purple: "shadow-purple-500/50",
    yellow: "shadow-yellow-500/50",
  }

  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 20px ${
            color === "green"
              ? "rgba(0, 255, 163, 0.3)"
              : color === "blue"
                ? "rgba(0, 212, 255, 0.3)"
                : color === "purple"
                  ? "rgba(157, 78, 221, 0.3)"
                  : "rgba(255, 193, 7, 0.3)"
          }`,
          `0 0 40px ${
            color === "green"
              ? "rgba(0, 255, 163, 0.6)"
              : color === "blue"
                ? "rgba(0, 212, 255, 0.6)"
                : color === "purple"
                  ? "rgba(157, 78, 221, 0.6)"
                  : "rgba(255, 193, 7, 0.6)"
          }`,
          `0 0 20px ${
            color === "green"
              ? "rgba(0, 255, 163, 0.3)"
              : color === "blue"
                ? "rgba(0, 212, 255, 0.3)"
                : color === "purple"
                  ? "rgba(157, 78, 221, 0.3)"
                  : "rgba(255, 193, 7, 0.3)"
          }`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function TypewriterText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block w-0.5 h-6 bg-green-400 ml-1"
      />
    </span>
  )
}
