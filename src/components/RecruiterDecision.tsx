"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, Mail, ArrowUpRight, X, Cpu } from "lucide-react"

export default function RecruiterDecision() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if shown in this session
        const hasBeenShown = sessionStorage.getItem("recruiter_decision_shown")
        if (hasBeenShown) return

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
            const scrollPos = window.scrollY
            const scrollPercent = (scrollPos / scrollHeight) * 100

            if (scrollPercent >= 60) {
                setIsVisible(true)
                sessionStorage.setItem("recruiter_decision_shown", "true")
                window.removeEventListener("scroll", handleScroll)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToProjects = () => {
        const section = document.getElementById("projects")
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })
        }
        setIsVisible(false)
    }

    const openEmail = () => {
        window.location.href = "mailto:agarwalpranav0711@gmail.com?subject=Inquiry from Portfolio"
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed inset-0 z-[3000] flex items-center justify-center p-6 pointer-events-none"
                >
                    <div className="relative w-full max-w-md bg-[#030712]/90 backdrop-blur-3xl border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_80px_-20px_rgba(6,182,212,0.4)] pointer-events-auto">
                        {/* Header / HUD */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-cyan-500 rounded-full border border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-black" />
                            <span className="text-[10px] font-mono font-black text-black uppercase tracking-widest">Decision Protocol</span>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="text-center space-y-6">
                            <div className="relative inline-block mt-4">
                                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto">
                                    <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#030712] animate-ping" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white tracking-tight uppercase leading-none">
                                    Recruiter Decision Panel
                                </h3>
                                <p className="text-zinc-400 text-sm font-medium">
                                    You’ve explored the system architecture. <br />Ready to take technical action?
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-3 pt-4">
                                <button
                                    onClick={scrollToProjects}
                                    className="group relative flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                >
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    View Best Projects
                                </button>

                                <button
                                    onClick={openEmail}
                                    className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest transition-all"
                                >
                                    <Mail className="w-4 h-4 text-cyan-400" />
                                    Direct Contact
                                </button>
                            </div>

                            <div className="flex items-center justify-center gap-4 pt-4">
                                <div className="h-[1px] flex-grow bg-white/5" />
                                <span className="text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-[0.2em]">Neural ID: Pranav</span>
                                <div className="h-[1px] flex-grow bg-white/5" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
