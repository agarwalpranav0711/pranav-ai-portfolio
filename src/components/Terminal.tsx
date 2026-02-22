"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal as TerminalIcon, X, ChevronRight, Hash, Download } from "lucide-react"

const COMMANDS = {
    help: [
        "AVAILABLE COMMANDS:",
        "  about        - System identity summary",
        "  projects     - List deployed systems",
        "  skills       - Core tech arsenal",
        "  github       - Identity on GitHub",
        "  linkedin     - Professional bridge",
        "  contact      - Secure communication channel",
        "  clear        - Flush terminal history",
        "  exit         - Terminate session",
        "  ??           - [HIDDEN COMMANDS DETECTED]"
    ],
    about: [
        "IDENTITY: PRANAV",
        "ROLE: FULL-STACK & AI SYSTEMS BUILDER",
        "STATUS: STUDENT / SYSTEM ARCHITECT",
        "LOCATION: INDIA",
        "BIO: Obsessed with building real-world automation and AI-driven systems. Focused on shipping over theory."
    ],
    projects: [
        "DEPLOYED SYSTEMS:",
        "  1. Get Me A Chai      - Creator Support Platform",
        "  2. PersonaX           - AI Behavioral Analysis",
        "  3. AI Collab Studio   - Real-time AI Editor",
        "  4. Architect Bot      - System Diagram Generator",
        "  5. NPM Health Scanner - Ecosystem Diagnostics",
        "  6. Twitter UI Clone   - Pixel-perfect UI experiment"
    ],
    skills: [
        "CORE TECH ARSENAL:",
        "  Frontend: Next.js, React, Tailwind, Framer Motion",
        "  Backend:  Node.js, Express, Socket.io",
        "  Data:     MongoDB, Mongoose, LocalStorage",
        "  Logic:    Gemini API, n8n Automation, REST APIs"
    ],
    contact: [
        "SECURE CHANNEL:",
        "  Email: agarwalpranav0711@gmail.com",
        "  Status: Standing by for mission coordination."
    ],
    whoami: [
        "Pranav.exe",
        "AI Systems Builder",
        "Open to internships & collaborations"
    ],
    "sudo hire pranav": [
        "Access granted.",
        "Opening collaboration protocol...",
        "Contact: agarwalpranav0711@gmail.com"
    ],
    matrix: [
        "Wake up, Neo...",
        "The system is real."
    ],
    "open-source": [
        "Active GitHub contributor",
        "Exploring AI systems & automation"
    ],
    gsoc: [
        "Preparing for Google Summer of Code",
        "Focused on real-world open source"
    ]
}

export default function Terminal() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState("")
    const [history, setHistory] = useState<(string | React.ReactNode)[]>(["SYSTEM ONLINE. TYPE 'help' TO BEGIN."])
    const [isGlitching, setIsGlitching] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus()
        }
    }, [isOpen])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [history])

    const triggerGlitch = () => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 1500)
    }

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault()
        const rawCmd = input.trim()
        const cmd = rawCmd.toLowerCase()

        const newHistory = [...history, `> ${input}`]

        if (cmd === "hire pranav") {
            triggerGlitch()
            setHistory([
                ...newHistory,
                "Good decision. Initiating hiring protocol...",
                <div key={Date.now()} className="mt-4 space-y-4">
                    <motion.a
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all text-xs"
                    >
                        <Download className="w-4 h-4" />
                        DOWNLOAD RESUME (PDF)
                    </motion.a>
                    <div className="space-y-1 text-cyan-400/80 text-xs md:text-sm">
                        <p>• Email: <a href="mailto:agarwalpranav0711@gmail.com" className="hover:text-cyan-400 decoration-cyan-400/30 underline underline-offset-4">agarwalpranav0711@gmail.com</a></p>
                        <p>• LinkedIn: <a href="https://www.linkedin.com/in/pranavagarwal07" target="_blank" className="hover:text-cyan-400 decoration-cyan-400/30 underline underline-offset-4">linkedin.com/in/pranavagarwal07</a></p>
                        <p>• GitHub: <a href="https://github.com/agarwalpranav0711" target="_blank" className="hover:text-cyan-400 decoration-cyan-400/30 underline underline-offset-4">github.com/agarwalpranav0711</a></p>
                    </div>
                </div>
            ])
        } else if (cmd === "clear") {
            setHistory(["TERMINAL CLEARED. VERSION 1.1.0"])
        } else if (cmd === "exit") {
            setIsOpen(false)
        } else if (cmd === "github") {
            window.open("https://github.com/agarwalpranav0711", "_blank")
            newHistory.push("REDIRECTING TO GITHUB...")
            setHistory(newHistory)
        } else if (cmd === "linkedin") {
            window.open("https://www.linkedin.com/in/pranavagarwal07", "_blank")
            newHistory.push("REDIRECTING TO LINKEDIN...")
            setHistory(newHistory)
        } else if (cmd in COMMANDS) {
            setHistory([...newHistory, ...COMMANDS[cmd as keyof typeof COMMANDS]])
        } else if (rawCmd in COMMANDS) {
            setHistory([...newHistory, ...COMMANDS[rawCmd as keyof typeof COMMANDS]])
        } else if (cmd !== "") {
            newHistory.push(`UNKNOWN COMMAND: '${cmd}'. TYPE 'help' FOR LIST.`)
            setHistory(newHistory)
        }

        setInput("")
    }

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[999] px-5 py-2.5 md:px-6 md:py-3 bg-cyan-900/80 backdrop-blur-md border border-cyan-500/50 rounded-full text-cyan-400 font-mono text-[11px] md:text-sm font-bold flex items-center gap-2"
            >
                <TerminalIcon className="w-4 h-4 animate-pulse" />
                OPEN SERVER TERMINAL
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-xl ${isGlitching ? 'animate-pulse' : ''}`}
                    >
                        {/* RGB Shift Overlay during glitch */}
                        {isGlitching && (
                            <div className="absolute inset-0 pointer-events-none z-[1001] bg-cyan-500/10 mix-blend-screen animate-flicker">
                                <div className="absolute inset-0 bg-red-500/5 -translate-x-1" />
                                <div className="absolute inset-0 bg-blue-500/5 translate-x-1" />
                            </div>
                        )}

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{
                                scale: isGlitching ? [1, 1.02, 0.98, 1] : 1,
                                x: isGlitching ? [0, -2, 2, 0] : 0,
                                y: 0
                            }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={isGlitching ? { duration: 0.2, repeat: 7 } : { duration: 0.3 }}
                            className="relative w-full max-w-5xl h-[80vh] bg-[#030712] border border-cyan-500/30 rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)] flex flex-col"
                        >
                            <div className="flex items-center justify-between px-4 py-2 bg-cyan-950/20 border-b border-cyan-500/20">
                                <div className="flex items-center gap-2">
                                    <TerminalIcon className="w-3 h-3 text-cyan-500" />
                                    <span className="text-[10px] font-mono tracking-widest text-cyan-500/70 font-bold uppercase italic">PRANAV_OS_v1.1.0</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div
                                ref={scrollRef}
                                className="flex-grow p-6 font-mono text-sm md:text-base text-cyan-400 overflow-y-auto scrollbar-hide space-y-2 selection:bg-cyan-500/30"
                            >
                                {history.map((line, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={i}
                                        className={`${typeof line === 'string' && line.startsWith('>') ? 'text-white font-bold' : 'text-cyan-400/90'}`}
                                    >
                                        {line}
                                    </motion.div>
                                ))}

                                <form onSubmit={handleCommand} className="flex gap-2 items-center mt-4">
                                    <ChevronRight className="w-4 h-4 text-white animate-pulse" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="flex-grow bg-transparent border-none outline-none text-white caret-cyan-400 font-mono"
                                        placeholder="Enter mission command..."
                                        autoFocus
                                    />
                                </form>
                            </div>

                            <div className="px-4 py-1 bg-cyan-500/5 flex justify-between items-center text-[8px] font-mono text-cyan-900">
                                <div className="flex gap-4">
                                    <span>SECURE_SESSION: {isGlitching ? 'CORRUPTED' : 'ACTIVE'}</span>
                                    <span>LATENCY: {isGlitching ? '999MS' : '14MS'}</span>
                                    <span>KERNEL: AI_DIRECT_1.1</span>
                                </div>
                                <Hash className="w-2 h-2" />
                            </div>
                        </motion.div>

                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                            <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,255,0.02),rgba(0,255,255,0.01),rgba(0,255,255,0.02))] bg-[length:100%_2px,3px_100%]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
