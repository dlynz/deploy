"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"

const experiences = [
  {
    title: "Casual Academic",
    company: "University of New South Wales",
    location: "Sydney, NSW",
    period: "May 2024 - Present",
    description: [
      "Taught concepts learnt in COMP2041 such as RegEx, shell scripting, python scripting and linux",
      "Learnt important interpersonal communication skills to effectively convey key learning objectives to hundreds of university students",
      "Duties included lab-assisting, assignment marking and test invigilation",
    ],
  },
  {
    title: "Customer Service Representative",
    company: "Australian Dream Holiday",
    location: "Sydney, NSW",
    period: "Apr 2020 - Aug 2022",
    description: [
      "Communicate with clients to set up and plan their itineraries",
      "Assess and troubleshoot problems with certain guided tours, hotel bookings and technology issues",
      "Greatly improved my communication skills by dealing with customer enquiries and managerial issues",
    ],
  },
  {
    title: "Private Tutor",
    company: "Self-Employed",
    location: "Sydney, NSW",
    period: "March 2023 - Present",
    description: [
      "Privately tutored a variety of HSC and Selective/OC level subjects to students in years 4-12",
      "Created a rigorous 10-week plan of study for every student and prepared ample presentation/homework resources",
      "Subjects tutored included chemistry, mathematics and english",
    ],
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            Experience
          </span>
        </h2>
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500"></div>
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={`${experience.title}-${experience.company}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:items-center`}
              >
                <div className="md:w-1/2 mb-8 md:mb-0 md:px-8">
                  <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/10">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{experience.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {experience.period}
                        </div>
                      </div>
                      <CardDescription className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {experience.company} | {experience.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 list-disc pl-5">
                        {experience.description.map((item, i) => (
                          <li key={i} className="text-sm">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 z-10"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}


