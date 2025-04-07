"use client"

import { useEffect, useRef } from "react"

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Star properties
    interface Star {
      x: number
      y: number
      size: number
      opacity: number
      rotationAngle: number
      pulseSpeed: number
      pulseDirection: number
      sparkle: boolean
      sparkleTime: number
    }

    // Create stars
    const stars: Star[] = []
    const starCount = Math.floor((canvas.width * canvas.height) / 20000) // Adjust density

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // Smaller stars for subtlety
        opacity: Math.random() * 0.3 + 0.1, // Lower opacity for subtlety
        rotationAngle: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.005 + 0.002, // Slower pulse
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
        sparkle: Math.random() > 0.95, // Only 5% of stars sparkle
        sparkleTime: 0,
      })
    }

    // Draw 4-pointed star
    const drawStar = (
      x: number,
      y: number,
      size: number,
      opacity: number,
      rotation: number,
      sparkle: boolean,
      sparkleTime: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()

      // Draw a 4-pointed star
      ctx.moveTo(0, -size)
      ctx.lineTo(size / 3, -size / 3)
      ctx.lineTo(size, 0)
      ctx.lineTo(size / 3, size / 3)
      ctx.lineTo(0, size)
      ctx.lineTo(-size / 3, size / 3)
      ctx.lineTo(-size, 0)
      ctx.lineTo(-size / 3, -size / 3)
      ctx.closePath()

      // Create iridescent gradient
      const gradient = ctx.createLinearGradient(-size, -size, size, size)
      gradient.addColorStop(0, `rgba(124, 58, 237, ${opacity})`) // violet
      gradient.addColorStop(0.5, `rgba(236, 72, 153, ${opacity})`) // pink
      gradient.addColorStop(1, `rgba(34, 211, 238, ${opacity})`) // cyan

      ctx.fillStyle = gradient
      ctx.fill()

      // Add sparkle effect to some stars
      if (sparkle && Math.sin(sparkleTime) > 0.7) {
        ctx.globalAlpha = Math.sin(sparkleTime) - 0.7
        ctx.beginPath()
        const sparkleSize = size * 1.5

        // Horizontal line
        ctx.moveTo(-sparkleSize, 0)
        ctx.lineTo(sparkleSize, 0)

        // Vertical line
        ctx.moveTo(0, -sparkleSize)
        ctx.lineTo(0, sparkleSize)

        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Pulse effect
        star.opacity += star.pulseSpeed * star.pulseDirection
        if (star.opacity > 0.4 || star.opacity < 0.1) {
          star.pulseDirection *= -1
        }

        // Very slow rotation
        star.rotationAngle += 0.0005

        // Update sparkle time
        if (star.sparkle) {
          star.sparkleTime += 0.03
        }

        drawStar(star.x, star.y, star.size, star.opacity, star.rotationAngle, star.sparkle, star.sparkleTime)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed left-0 top-0 -z-10 h-full w-full bg-gradient-to-b from-black via-violet-950/20 to-black"
    />
  )
}


