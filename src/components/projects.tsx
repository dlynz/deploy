"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Sparkles } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Grovify",
    description:
      "A full-stack web application utilizing generative AI to create assets for a productivity tracker with an isometric map that grows as tasks are completed based on a real-time economy.",
    image: "/groveify.png",
    tags: ["React", "Vite", "TypeScript", "Express.js", "TailwindCSS", "Dall-E"],
    link: "https://grovify.com",
    github: "https://github.com/devsoc-unsw/trainee-earth-24t1",
    featured: true,
  },
  {
    title: "Notangles",
    description:
      "A university classes and event timetabling web application used by thousands of UNSW students each term, with collaborative features for easy cooperative timetabling.",
    image: "/notangles.png",
    tags: ["React", "Material-UI", "Git", "MongoDB", "Express", "Docker"],
    link: "https://notangles.devsoc.app",
    github: "https://github.com/devsoc-unsw/notangles",
    featured: true,
  },
  {
    title: "Portfolio Website",
    description:
      "The current website that you are seeing :).",
    image: "/placeholder.svg?height=300&width=600",
    tags: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
    link: "https://dlyn.dev",
    github: "https://github.com/dlynz/deploy",
    featured: false,
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-12 flex items-center justify-center">
          <div className="relative">
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              <span className="animate-gradient bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="absolute -right-8 -top-6">
              <Sparkles className="h-6 w-6 text-fuchsia-300" />
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} inView={inView} />
            ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-center text-2xl font-bold">Other Noteworthy Projects</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index + 2} inView={inView} compact />
              ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  inView,
  compact = false,
}: {
  project: (typeof projects)[0]
  index: number
  inView: boolean
  compact?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Card className="overflow-hidden border border-white/10 bg-black/30 backdrop-blur-lg transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10">
        {!compact && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        )}
        <CardHeader className={compact ? "pb-2" : ""}>
          <CardTitle className="flex items-center">
            {project.title}
            {index === 0 && <span className="ml-2 text-xs">✨</span>}
          </CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className={compact ? "pb-2" : ""}>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-white/5 hover:bg-white/10">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-between">
            <Button
              variant="outline"
              size="sm"
              className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10"
              onClick={() => window.open(project.github, "_blank")}
            >
              <Github className="mr-2 h-4 w-4" />
              Code
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:from-violet-600 hover:to-cyan-600"
              onClick={() => window.open(project.link, "_blank")}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}


