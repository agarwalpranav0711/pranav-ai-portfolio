"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, X, Send, Cpu, Sparkles, ChevronRight } from "lucide-react"

interface Message {
    role: "user" | "assistant";
    content: string;
}

const KNOWLEDGE_BASE = {
    about: [
        "Pranav is an AI-focused Full-stack Builder and System Architect.",
        "He specializes in shifting from theoretical 'tutorial hell' to real-world system engineering.",
        "Primary focus: AI agents, autonomous automation, and scalable system design."
    ],
    skills: [
        "CURRENT TECH ARSENAL:",
        "• FRONTEND: Next.js, React, Tailwind CSS, Framer Motion",
        "• BACKEND: Node.js, Express, Socket.io, REST APIs",
        "• DATA: MongoDB, Mongoose, LocalStorage",
        "• AI/AUTOMATION: n8n, Gemini API, LangChain, AI Agent Frameworks"
    ],
    projects: [
        "ACTIVE DEPLOYMENTS:",
        "• PERASONAX: AI behavioral analysis engine.",
        "• AI COLLAB STUDIO: Real-time collaborative AI editor.",
        "• GET ME A CHAI: High-performance creator support platform.",
        "• ARCHITECT BOT: Neural system diagram generator.",
        "• NPM HEALTH SCANNER: Deep ecosystem diagnostics tool.",
        "• TWITTER UI CLONE: Design engineering & state management study."
    ],
    internship: [
        "SYSTEM STATUS: OPEN FOR MISSIONS.",
        "Targeting: AI Engineering, Full-stack Development, or Automation Architect roles.",
        "Pranav is looking for high-impact teams building real-world AI systems."
    ],
    contact: [
        "SECURE CHANNELS:",
        "• EMAIL: agarwalpranav0711@gmail.com",
        "• GITHUB: github.com/agarwalpranav0711",
        "• LINKEDIN: linkedin.com/in/pranavagarwal07"
    ],
    hire: [
        "WHY PRANAV? SIMPLE:",
        "1. HE SHIPS. No bloated code, just functional products.",
        "2. SYSTEM THINKING. He builds for the edge cases, not just the happy path.",
        "3. AI NATIVE. He integrates intelligence into the core, not as a wrapper."
    ],
    resume: [
        "ACCESS RESTRICTED: COMPLETE PROOF OF WORK AVAILABLE ON GITHUB.",
        "Type 'contact' to request a physical CV or verify technical skills via 'projects'."
    ],
    default: [
        "I operate primarily on Engineering, AI systems, and real-world product building.",
        "Try asking about my: projects, skills, internship status, or architecture."
    ]
}

export default function AIChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "NEURAL_LINK_ESTABLISHED. I am PRANAV_AI. Initializing technical context for your evaluation..." }
    ])
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const getResponse = (query: string): string => {
        const q = query.toLowerCase()

        if (q.includes("about") || q.includes("who") || q.includes("identity")) return KNOWLEDGE_BASE.about.join("\n")
        if (q.includes("skill") || q.includes("stack") || q.includes("tech")) return KNOWLEDGE_BASE.skills.join("\n")
        if (q.includes("project") || q.includes("work") || q.includes("build")) return KNOWLEDGE_BASE.projects.join("\n")
        if (q.includes("intern") || q.includes("job") || q.includes("collab")) return KNOWLEDGE_BASE.internship.join("\n")
        if (q.includes("contact") || q.includes("email") || q.includes("github") || q.includes("linkedin")) return KNOWLEDGE_BASE.contact.join("\n")
        if (q.includes("hire") || q.includes("why") || q.includes("recruit")) return KNOWLEDGE_BASE.hire.join("\n")
        if (q.includes("resume") || q.includes("cv")) return KNOWLEDGE_BASE.resume.join("\n")

        return KNOWLEDGE_BASE.default.join("\n")
    }

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!input.trim() || isTyping) return

        const userMsg = input.trim()
        setInput("")
        setMessages(prev => [...prev, { role: "user", content: userMsg }])
        setIsTyping(true)

        // Simulate thinking/typing
        setTimeout(() => {
            const response = getResponse(userMsg)
            setMessages(prev => [...prev, { role: "assistant", content: response }])
            setIsTyping(false)
        }, 800)
    }

    return (
        <>
            {/* Floating AI Trigger */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-[76px] right-6 md:bottom-28 md:right-10 z-[998] w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] border border-white/20 group"
            >
                <Bot className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 md:w-4 md:h-4 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-32 right-8 z-[1000] w-[350px] md:w-[400px] h-[550px] bg-zinc-950 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)] flex flex-col backdrop-blur-2xl"
                    >
                        {/* Header */}
                        <div className="p-4 bg-cyan-950/20 border-b border-cyan-500/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 rounded-lg">
                                    <Cpu className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono font-black text-white tracking-widest uppercase">Pranav_AI Agent</h4>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] text-emerald-500/80 font-mono font-bold uppercase tracking-tighter">Local Intelligence Online</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/5 rounded-md transition-colors">
                                <X className="w-4 h-4 text-zinc-500" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div
                            ref={scrollRef}
                            className="flex-grow p-4 overflow-y-auto space-y-4 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed"
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                                        ? "bg-cyan-500 text-black rounded-tr-none font-bold"
                                        : "bg-white/5 border border-white/10 text-cyan-50 rounded-tl-none shadow-sm backdrop-blur-md font-mono"
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Query system context..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 top-1.5 p-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                {["/about", "/projects", "/hire", "/contact"].map(cmd => (
                                    <button
                                        key={cmd}
                                        type="button"
                                        onClick={() => { setInput(cmd.replace('/', '')); }}
                                        className="whitespace-nowrap px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[9px] font-mono text-zinc-500 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                                    >
                                        {cmd}
                                    </button>
                                ))}
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
