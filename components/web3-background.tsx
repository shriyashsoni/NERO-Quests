"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Web3Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Enhanced blockchain nodes
    const nodes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      connections: number[]
      pulse: number
      type: "node" | "data" | "validator"
    }> = []

    // Enhanced digital particles
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      trail: Array<{ x: number; y: number; opacity: number }>
      energy: number
    }> = []

    // Data streams
    const dataStreams: Array<{
      x: number
      y: number
      vx: number
      vy: number
      length: number
      color: string
      opacity: number
    }> = []

    const colors = ["#00FFA3", "#00D4FF", "#9D4EDD", "#F72585", "#FFD700", "#FF6B6B"]

    // Create enhanced blockchain nodes
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        type: ["node", "data", "validator"][Math.floor(Math.random() * 3)] as "node" | "data" | "validator",
      })
    }

    // Create enhanced digital particles
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: [],
        energy: Math.random() * 100,
      })
    }

    // Create data streams
    for (let i = 0; i < 15; i++) {
      dataStreams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        length: Math.random() * 50 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
      })
    }

    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.02

      // Enhanced grid pattern with animation
      ctx.strokeStyle = `rgba(0, 255, 163, ${0.03 + Math.sin(time) * 0.02})`
      ctx.lineWidth = 1
      const gridSize = 60
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Update and draw data streams
      dataStreams.forEach((stream, index) => {
        stream.x += stream.vx
        stream.y += stream.vy

        // Bounce off edges
        if (stream.x < 0 || stream.x > canvas.width) stream.vx *= -1
        if (stream.y < 0 || stream.y > canvas.height) stream.vy *= -1

        // Draw stream
        const gradient = ctx.createLinearGradient(
          stream.x,
          stream.y,
          stream.x - stream.vx * stream.length,
          stream.y - stream.vy * stream.length,
        )
        gradient.addColorStop(0, stream.color)
        gradient.addColorStop(1, "transparent")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.globalAlpha = stream.opacity
        ctx.beginPath()
        ctx.moveTo(stream.x, stream.y)
        ctx.lineTo(stream.x - stream.vx * stream.length, stream.y - stream.vy * stream.length)
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      // Update and draw enhanced particles with trails
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.energy += 0.5

        // Add to trail
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity })
        if (particle.trail.length > 15) {
          particle.trail.shift()
        }

        // Bounce off edges with energy loss
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.energy *= 0.9
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.energy *= 0.9
        }

        // Draw enhanced trail
        particle.trail.forEach((point, i) => {
          const trailOpacity = ((point.opacity * i) / particle.trail.length) * 0.5
          const trailSize = particle.size * (i / particle.trail.length) * 0.8

          ctx.beginPath()
          ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2)
          ctx.fillStyle = particle.color.replace("1)", `${trailOpacity})`)
          ctx.fill()
        })

        // Draw particle with energy glow
        const glowSize = Math.max(particle.size + Math.sin(particle.energy * 0.1) * 2, 1)

        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          Math.max(glowSize * 2, 1),
        )
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.globalAlpha = particle.opacity * 0.3
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowSize * 2, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity + Math.sin(time * 3 + index) * 0.3
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Update and draw enhanced blockchain nodes
      nodes.forEach((node, index) => {
        // Update position
        node.x += node.vx
        node.y += node.vy
        node.pulse += 0.1

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Enhanced node rendering based on type
        const pulseSize = Math.max(node.size + Math.sin(node.pulse) * 3, 1)

        // Node-specific styling
        let nodeColor = node.color
        let nodeShape = "circle"

        switch (node.type) {
          case "validator":
            nodeColor = "#FFD700"
            nodeShape = "diamond"
            break
          case "data":
            nodeColor = "#00D4FF"
            nodeShape = "square"
            break
          default:
            nodeShape = "circle"
        }

        // Draw node glow
        const nodeGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, Math.max(pulseSize * 3, 1))
        nodeGradient.addColorStop(0, nodeColor)
        nodeGradient.addColorStop(1, "transparent")

        ctx.fillStyle = nodeGradient
        ctx.globalAlpha = node.opacity * 0.4
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw node based on type
        ctx.globalAlpha = node.opacity
        ctx.fillStyle = nodeColor

        if (nodeShape === "circle") {
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
          ctx.fill()
        } else if (nodeShape === "square") {
          ctx.fillRect(node.x - pulseSize, node.y - pulseSize, pulseSize * 2, pulseSize * 2)
        } else if (nodeShape === "diamond") {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y - pulseSize)
          ctx.lineTo(node.x + pulseSize, node.y)
          ctx.lineTo(node.x, node.y + pulseSize)
          ctx.lineTo(node.x - pulseSize, node.y)
          ctx.closePath()
          ctx.fill()
        }

        // Draw enhanced node border
        ctx.strokeStyle = nodeColor
        ctx.lineWidth = 2
        ctx.globalAlpha = node.opacity * 0.8
        ctx.stroke()
        ctx.globalAlpha = 1

        // Draw enhanced connections between nearby nodes
        nodes.forEach((otherNode, otherIndex) => {
          if (index !== otherIndex) {
            const dx = node.x - otherNode.x
            const dy = node.y - otherNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 200) {
              // Animated connection
              const connectionOpacity = ((200 - distance) / 200) * 0.4
              const connectionWidth = 2 + Math.sin(time * 2 + index + otherIndex) * 1

              ctx.beginPath()
              ctx.moveTo(node.x, node.y)
              ctx.lineTo(otherNode.x, otherNode.y)
              ctx.strokeStyle = node.color
              ctx.globalAlpha = connectionOpacity
              ctx.lineWidth = connectionWidth
              ctx.stroke()

              // Draw animated data packets along connections
              const packetProgress = Math.sin(time * 3 + index) * 0.5 + 0.5
              const packetX = node.x + (otherNode.x - node.x) * packetProgress
              const packetY = node.y + (otherNode.y - node.y) * packetProgress

              ctx.beginPath()
              ctx.arc(packetX, packetY, 3, 0, Math.PI * 2)
              ctx.fillStyle = "#FFD700"
              ctx.globalAlpha = 0.8
              ctx.fill()
            }
          }
        })
        ctx.globalAlpha = 1
      })

      // Draw floating enhanced hexagons with rotation
      for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 9) * (i + 1) + Math.sin(time + i) * 80
        const y = canvas.height / 2 + Math.cos(time * 0.7 + i) * 120
        const size = 25 + Math.sin(time * 2 + i) * 8
        const rotation = time * 0.5 + i

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)

        ctx.beginPath()
        for (let j = 0; j < 6; j++) {
          const angle = (j * Math.PI) / 3
          const hx = Math.cos(angle) * size
          const hy = Math.sin(angle) * size
          if (j === 0) ctx.moveTo(hx, hy)
          else ctx.lineTo(hx, hy)
        }
        ctx.closePath()

        ctx.strokeStyle = colors[i % colors.length]
        ctx.globalAlpha = 0.4 + Math.sin(time + i) * 0.2
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.restore()
        ctx.globalAlpha = 1
      }

      // Add floating blockchain symbols
      const symbols = ["⬢", "◆", "▲", "●", "■", "⬟", "⚡", "🔗"]
      symbols.forEach((symbol, i) => {
        const x = (canvas.width / symbols.length) * i + Math.sin(time * 0.5 + i) * 100
        const y = 100 + Math.cos(time * 0.3 + i) * 50

        ctx.font = `${30 + Math.sin(time + i) * 10}px Arial`
        ctx.fillStyle = colors[i % colors.length]
        ctx.globalAlpha = 0.1 + Math.sin(time + i) * 0.05
        ctx.fillText(symbol, x, y)
        ctx.globalAlpha = 1
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-50" style={{ zIndex: 1 }} />

      {/* Additional floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {/* Enhanced floating blockchain symbols */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-6xl opacity-10"
            style={{
              left: `${10 + i * 10}%`,
              top: `${15 + (i % 3) * 30}%`,
              color: ["#00FFA3", "#00D4FF", "#9D4EDD", "#F72585", "#FFD700"][i % 5],
            }}
            animate={{
              y: [-40, 40, -40],
              rotate: [0, 360],
              opacity: [0.05, 0.2, 0.05],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 2,
            }}
          >
            {["⬢", "◆", "▲", "●", "■", "⬟", "⚡", "🔗", "🌐", "💎"][i]}
          </motion.div>
        ))}

        {/* Enhanced glowing energy waves */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute rounded-full border-2"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
              borderColor: `rgba(${i % 2 === 0 ? "0, 255, 163" : "0, 212, 255"}, 0.1)`,
            }}
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25 + i * 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 4,
            }}
          />
        ))}

        {/* Floating data packets */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`packet-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: ["#00FFA3", "#00D4FF", "#9D4EDD", "#FFD700"][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </>
  )
}
