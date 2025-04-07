"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send, Sparkles } from "lucide-react"

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    // Show success message
    alert("Thank you for your message! I'll get back to you soon.")
  }

  return (
    <section id="contact" className="py-20">
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
                Contact Me
              </span>
            </h2>
            <div className="absolute -right-8 -top-6">
              <Sparkles className="h-6 w-6 text-fuchsia-300" />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="overflow-hidden border border-white/10 bg-black/30 backdrop-blur-lg transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10">
            <CardHeader>
              <CardTitle>Get in Touch ✨</CardTitle>
              <CardDescription>Fill out the form below and I&apos;ll respond as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="border-white/10 bg-white/5 focus:border-violet-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <div className="relative">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email"
                          required
                          className="border-white/10 bg-white/5 focus:border-violet-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message"
                        required
                        className="min-h-[150px] border-white/10 bg-white/5 focus:border-violet-500"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white hover:from-violet-600 hover:to-cyan-600"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>

              <div className="mt-8 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="flex items-center space-x-2">
                  <div className="h-px w-8 bg-white/20"></div>
                  <span className="text-sm text-muted-foreground">Or reach out directly</span>
                  <div className="h-px w-8 bg-white/20"></div>
                </div>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-violet-400"
                    onClick={() => window.open("mailto:contact@example.com")}
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-violet-400"
                    onClick={() => window.open("https://twitter.com/example", "_blank")}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  )
}


