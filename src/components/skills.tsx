"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Layers, PenToolIcon as Tool, Sparkles } from "lucide-react"

const skillCategories = [
  {
    name: "Languages",
    icon: <Code className="h-6 w-6" />,
    skills: [
      { name: "JavaScript/TypeScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "C", level: 85 },
      { name: "Bash", level: 65 },
      { name: "SQL (Postgres)", level: 75 },
    ],
  },
  {
    name: "Frameworks",
    icon: <Layers className="h-6 w-6" />,
    skills: [
      { name: "React", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "TailwindCSS", level: 95 },
      { name: "Next.js", level: 85 },
    ],
  },
  {
    name: "Developer Tools",
    icon: <Tool className="h-6 w-6" />,
    skills: [
      { name: "Git", level: 90 },
      { name: "Linux", level: 85 },
      { name: "Docker", level: 65 },
      { name: "Jira", level: 80 },
      { name: "Figma", level: 85 },
    ],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20">
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
                Technical Skills
              </span>
            </h2>
            <div className="absolute -right-8 -top-6">
              <Sparkles className="h-6 w-6 text-fuchsia-300" />
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              className="rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-lg transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div className="mb-6 flex items-center">
                <div className="mr-3 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 p-2">{category.icon}</div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex justify-between">
                      <span>{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-lg transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10"
          >
            <h3 className="mb-4 text-xl font-semibold">Languages</h3>
            <div className="flex flex-wrap gap-3">
              {["JavaScript", "TypeScript", "Python", "C", "Java", "SQL", "HTML", "CSS", "Bash", "RegEx", "Rust"].map(
                (lang) => (
                  <span key={lang} className="rounded-full bg-white/5 px-3 py-1 text-sm backdrop-blur-sm">
                    {lang}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="rounded-xl border border-white/10 bg-black/30 p-6 backdrop-blur-lg transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10"
          >
            <h3 className="mb-4 text-xl font-semibold">Frameworks & Libraries</h3>
            <div className="flex flex-wrap gap-3">
              {["React", "Node.js", "TailwindCSS", "Express", "Next.js", "Vite", "Shadcn", "JUnit"].map((fw) => (
                <span key={fw} className="rounded-full bg-white/5 px-3 py-1 text-sm backdrop-blur-sm">
                  {fw}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}


