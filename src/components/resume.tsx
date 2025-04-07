"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, GraduationCap, Briefcase, Code, Layers, PenToolIcon as Tool } from "lucide-react"

export default function Resume() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="resume" className="py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <div className="mb-12 flex items-center justify-center">
          <div className="relative">
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              <span className="animate-gradient bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Resume
              </span>
            </h2>
            <div className="absolute -right-8 -top-6">
              <Sparkles className="h-6 w-6 text-fuchsia-300" />
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border border-white/10 bg-black/30 backdrop-blur-lg transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-violet-400" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">University of New South Wales</h3>
                  <p className="text-sm text-muted-foreground">Bachelor of Computer Science</p>
                  <p className="text-sm text-muted-foreground">Feb. 2023 – Present</p>
                  <p className="text-sm text-muted-foreground">Sydney, NSW</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Normanhurst Boys High School</h3>
                  <p className="text-sm text-muted-foreground">Feb. 2017 – Nov. 2022</p>
                  <p className="text-sm text-muted-foreground">Sydney, NSW</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Technical Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border border-white/10 bg-black/30 backdrop-blur-lg transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-violet-400" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Code className="mr-2 h-4 w-4 mt-0.5 text-violet-400" />
                    <div>
                      <h4 className="font-medium">Languages:</h4>
                      <p className="text-sm text-muted-foreground">
                        JavaScript/TypeScript, Python, C, Java, SQL (Postgres), HTML/CSS, Bash, RegEx
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Layers className="mr-2 h-4 w-4 mt-0.5 text-violet-400" />
                    <div>
                      <h4 className="font-medium">Frameworks:</h4>
                      <p className="text-sm text-muted-foreground">
                        React, Node.js, TailWindCSS, JUnit, Material-UI, Express, Vite, Next.js
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Tool className="mr-2 h-4 w-4 mt-0.5 text-violet-400" />
                    <div>
                      <h4 className="font-medium">Developer Tools:</h4>
                      <p className="text-sm text-muted-foreground">
                        Git, Linux, Docker, Vim, Tmux, VS Code, Jira, IntelliJ, Gradle, Maven
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="border border-white/10 bg-black/30 backdrop-blur-lg transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-violet-400" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Grovify</h3>
                  <p className="text-sm text-muted-foreground">Feb. 2024 – May. 2024</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  React, Vite, TypeScript, Express.js, TailWindCSS, Dall-E | grovify.com
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>
                    Developed a full-stack web application in a group, utilising generative AI to create assets for a
                    productivity tracker with an isometric map that grows as tasks are completed based on a real-time
                    economy
                  </li>
                  <li>Implemented various draggable widgets using dnd-kit and TailWindCSS</li>
                  <li>Visualised GitHub data to show contributions and motivate users</li>
                  <li>HTML Canvas to smoothly render hundreds of images and visualise our isometric map</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Notangles</h3>
                  <p className="text-sm text-muted-foreground">Feb. 2024 – Dec. 2024</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  React, Material-UI, Git, MongoDB, Express, Docker | notangles.devsoc.app
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>
                    Helped to develop a university classes and event timetabling web application used by thousands of
                    UNSW students each term
                  </li>
                  <li>Revamped certain UI elements and created a new landing page</li>
                  <li>Worked on implementing a collaborative &quot;friends&quot; feature for easy cooperative timetabling</li>
                  <li>
                    Automatically updates the scraping on each term&apos;s courses by scraping the information from UNSW&apos;s
                    timetable website using a library called Puppeteer
                  </li>
                  <li>Collaborated with UNSW students through feedback to provide the best user experience possible</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="border border-white/10 bg-black/30 backdrop-blur-lg transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-violet-400" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Casual Academic</h3>
                  <p className="text-sm text-muted-foreground">May. 2024 – Present</p>
                </div>
                <p className="text-sm text-muted-foreground">University of New South Wales | Sydney, NSW</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Taught concepts learnt in COMP2041 such as RegEx, shell scripting, python scripting and linux</li>
                  <li>
                    Learnt important interpersonal communication skills to effectively convey key learning objectives to
                    hundreds of university students
                  </li>
                  <li>Duties included lab-assisting, assignment marking and test invigilation</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Customer Service Representative</h3>
                  <p className="text-sm text-muted-foreground">Apr. 2020 – Aug. 2022</p>
                </div>
                <p className="text-sm text-muted-foreground">Australian Dream Holiday | Sydney, NSW</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Communicate with clients to set up and plan their itineraries</li>
                  <li>
                    Assess and troubleshoot problems with certain guided tours, hotel bookings and technology issues
                  </li>
                  <li>
                    Greatly improved my communication skills by dealing with customer enquiries and managerial issues
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Private Tutor</h3>
                  <p className="text-sm text-muted-foreground">March. 2023 – Present</p>
                </div>
                <p className="text-sm text-muted-foreground">Self-Employed | Sydney, NSW</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Privately tutored a variety of HSC and Selective/OC level subjects to students in years 4-12</li>
                  <li>
                    Created a rigorous 10-week plan of study for every student and prepared ample presentation/homework
                    resources
                  </li>
                  <li>Subjects tutored included chemistry, mathematics and english</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-medium transition-all"
          >
            Download Full Resume
          </a>
        </div>
      </motion.div>
    </section>
  )
}


