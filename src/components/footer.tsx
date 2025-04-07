import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              <span className="animate-gradient bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                dlyn.dev
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Dylan Zhang. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/dlynz"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 transition-colors hover:bg-white/10 hover:text-violet-400"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/in/dylan-zhang-18a990262"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 transition-colors hover:bg-white/10 hover:text-violet-400"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 transition-colors hover:bg-white/10 hover:text-violet-400"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="mailto:dylan.zhang15@gmail.com"
              className="rounded-full p-2 transition-colors hover:bg-white/10 hover:text-violet-400"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

