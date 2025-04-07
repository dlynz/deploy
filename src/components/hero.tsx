"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <div className="relative mx-auto mb-6 inline-block">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-300 to-cyan-300 opacity-75 blur-md"></div>
          <div className="relative rounded-full bg-black/30 p-1 backdrop-blur-sm">
            <div className="rounded-full bg-black/60 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium text-white">Portfolio</span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          <span className="block">Hi I&apos;m</span>
          <span className="mt-2 block animate-gradient bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent pb-2">
            Dylan Zhang ✨
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Computer Science student at UNSW, interested in creating unique digital experiences with modern web technologies
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:from-violet-600 hover:to-cyan-600"
            size="lg"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-violet-500 text-violet-500 hover:bg-violet-100/10 hover:text-violet-600"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Contact Me
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10"
      >
        <Button
          variant="ghost"
          size="icon"
          className="animate-bounce rounded-full"
          onClick={() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <ArrowDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  )
}


