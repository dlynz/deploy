import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Resume from "@/components/resume"
import Contact from "@/components/contact"
import StarBackground from "@/components/star-background"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <StarBackground />
      <div className="container relative z-10 mx-auto px-4 py-8">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
      </div>
    </main>
  )
}

