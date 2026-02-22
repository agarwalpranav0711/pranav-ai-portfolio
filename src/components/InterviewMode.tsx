"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldAlert, Terminal, MessageSquare, Briefcase, Code, Sparkles, X, ChevronRight, Cpu } from "lucide-react"

const INTERVIEW_DATA = [
    {
        question: "Explain Your Best Project",
        answer: "AI Collab Studio is my most technically complex build.\n\nIt combines real-time collaboration, rich text editing, AI-assisted content generation, and multi-user synchronization. The main challenge was maintaining consistency between users while integrating AI assistance without breaking state flow.\n\nIt demonstrates real-time architecture, AI integration, clean system design, and strong UX thinking.",
        icon: <Sparkles className="w-4 h-4" />
    },
    {
        question: "How Do You Design Systems?",
        answer: "I follow a product-first approach before writing code.\n\n1. Clarify the problem and user flow\n2. Design a scalable database schema (MongoDB)\n3. Build efficient API routes (Next.js)\n4. Connect a reactive UI layer\n5. Anticipate edge cases and scaling early\n\nI think in flows and modules rather than isolated components.",
        icon: <Cpu className="w-4 h-4" />
    },
    {
        question: "How Do You Use AI in Real Apps?",
        answer: "I treat AI as a functional module within the stack—not just a chatbot wrapper.\n\nIn PersonaX, I use LLMs to generate structured behavioral insights. In Architect Bot, AI converts natural language into Mermaid DSL for system diagrams.\n\nMy approach:\n- Use AI where rule-based systems become complex\n- Maintain structured output formats\n- Keep architecture modular and scalable\n\nAI is integrated thoughtfully—not added as a gimmick.",
        icon: <Code className="w-4 h-4" />
    },
    {
        question: "Why Should We Hire You?",
        answer: "Because I execute.\n\nI move beyond prototypes and focus on shipping production-ready systems. I understand the full lifecycle of a digital product—architecture, APIs, state management, UX, and deployment.\n\nI combine system-level thinking with fast execution. You’re hiring someone who builds complete solutions, not isolated features.",
        icon: <Briefcase className="w-4 h-4" />
    },
    {
        question: "Internship Readiness",
        answer: "I’m ready to contribute to real production teams. I’ve independently built and deployed full-stack systems—from database design to frontend polish.\n\nI work confidently with Git workflows, structured development practices, and iterative shipping. I prioritize maintainable architecture and scalability from the start.\n\nI’m especially interested in contributing to AI-driven or high-impact product teams.",
        icon: <ShieldAlert className="w-4 h-4" />
    }
]

export default function InterviewMode() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [displayedAnswer, setDisplayedAnswer] = useState("")

    useEffect(() => {
        if (isOpen) {
            let i = 0
            const fullText = INTERVIEW_DATA[activeQuestion].answer
            setDisplayedAnswer("")
            const interval = setInterval(() => {
                setDisplayedAnswer(fullText.slice(0, i))
                i++
                if (i > fullText.length) clearInterval(interval)
            }, 15) // Slightly faster typing for better UX
            return () => clearInterval(interval)
        }
    }, [isOpen, activeQuestion])

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="mt-8 px-8 py-3 bg-white/5 border border-cyan-500/30 rounded-full text-cyan-400 font-mono text-sm font-bold flex items-center gap-3 group transition-all"
            >
                <Terminal className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                ENTER INTERVIEW SIMULATION
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-2xl p-4 md:p-12 overflow-hidden flex items-center justify-center font-mono"
                    >
                        <div className="max-w-7xl w-full h-full md:h-[85vh] bg-[#030712] border border-cyan-500/20 rounded-3xl overflow-hidden shadow-[0_0_100px_-20px_rgba(6,182,212,0.3)] flex flex-col">

                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-cyan-500/5">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                                        <ShieldAlert className="w-5 h-5 text-cyan-400 animate-pulse" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white tracking-widest uppercase italic border-l-2 border-cyan-500 pl-4">Review_Mode: Professional</h2>
                                        <p className="text-[10px] text-emerald-500/70 font-bold uppercase tracking-[0.2em] mt-1">Status: Ready for Contribution</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-white transition-all text-xs border border-white/5"
                                >
                                    <X className="w-4 h-4" />
                                    RETURN_TO_PORTFOLIO
                                </button>
                            </div>

                            {/* Main Content */}
                            <div className="flex-grow flex flex-col md:flex-row overflow-hidden">

                                {/* Left Panel: Questions */}
                                <div className="w-full md:w-1/3 border-r border-white/5 overflow-y-auto p-4 space-y-3 bg-black/20">
                                    <span className="block text-[9px] text-zinc-600 mb-4 tracking-[0.3em] uppercase">Select Inquiry Node:</span>
                                    {INTERVIEW_DATA.map((item, idx) => (
                                        <motion.button
                                            key={idx}
                                            onClick={() => setActiveQuestion(idx)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${activeQuestion === idx
                                                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                                                : 'bg-white/5 border-transparent text-zinc-500 hover:border-white/10 hover:text-zinc-300'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg ${activeQuestion === idx ? 'bg-cyan-500/20' : 'bg-black/40'}`}>
                                                {item.icon}
                                            </div>
                                            <span className="text-xs font-bold leading-tight">{item.question}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Right Panel: Answer Area */}
                                <div className="flex-grow p-8 md:p-12 flex flex-col relative overflow-hidden">
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <Cpu className="w-40 h-40 text-cyan-500" />
                                    </div>

                                    <div className="relative z-10 max-w-2xl">
                                        <div className="flex items-center gap-2 mb-8">
                                            <ChevronRight className="w-4 h-4 text-cyan-500" />
                                            <span className="text-[10px] text-zinc-500 tracking-[0.5em] uppercase">Transmitting Data...</span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight uppercase leading-tight">
                                            {INTERVIEW_DATA[activeQuestion].question}
                                        </h3>

                                        <p className="text-sm md:text-lg text-cyan-50/80 leading-relaxed font-medium min-h-[150px] whitespace-pre-wrap">
                                            {displayedAnswer}
                                            <motion.span
                                                animate={{ opacity: [1, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                                className="inline-block w-2 h-4 bg-cyan-400 ml-2 align-middle shadow-[0_0_8px_#22d3ee]"
                                            />
                                        </p>

                                        <div className="mt-12 flex items-center gap-6">
                                            <div className="flex gap-1">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="w-8 h-1 bg-cyan-400/20" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Footer Bar */}
                            <div className="p-4 bg-cyan-500/5 border-t border-white/5 flex justify-between items-center text-[9px] text-cyan-900 font-bold uppercase tracking-[0.4em]">
                                <div className="flex gap-8">
                                    <span>Logic_Engine: Active</span>
                                    <span>Neural_Pass: Certified</span>
                                    <span>UID: Pranav_Simulation</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 bg-cyan-900 rounded-full animate-pulse" />
                                    <span>Streaming_Intel</span>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
