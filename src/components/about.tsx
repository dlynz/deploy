"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Mail, Phone, Github, Linkedin } from "lucide-react"
import pfp from '../../public/pfp.jpg'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">About Me</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 animate-gradient opacity-70 blur-xl"></div>
            <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-white/20">
              <Image
                src={pfp}
                alt="Dylan Zhang"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg">
              I&apos;m a Computer Science student at the University of New South Wales (Feb. 2023 – Oct. 2025), passionate
              about creating innovative web applications and solving complex problems.
            </p>
            <p className="text-lg">
              With experience in full-stack development, I enjoy building applications that are both functional and
              visually appealing. My background in customer service and tutoring has equipped me with strong
              communication skills that complement my technical abilities.
            </p>
            <div className="flex flex-col space-y-2 pt-4">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-violet-400" />
                <a href="mailto:dylan.zhang15@gmail.com" className="hover:text-violet-400 transition-colors">
                  dylan.zhang15@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-violet-400" />
                <span>0449-935-294</span>
              </div>
              <div className="flex items-center">
                <Linkedin className="mr-2 h-4 w-4 text-violet-400" />
                <a
                  href="https://linkedin.com/in/dylan-zhang-18a990262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-400 transition-colors"
                >
                  linkedin.com/in/dylan-zhang-18a990262
                </a>
              </div>
              <div className="flex items-center">
                <Github className="mr-2 h-4 w-4 text-violet-400" />
                <a
                  href="https://github.com/dlynz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-400 transition-colors"
                >
                  github.com/dlynz
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}


