"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, CheckCircle, Zap, ShieldAlert } from "lucide-react"

export default function RecruiterDetector() {
    const [isVisible, setIsVisible] = useState(false)
    const [scanning, setScanning] = useState(false)

    useEffect(() => {
        // Only run on desktop
        if (typeof window !== "undefined" && window.innerWidth < 900) return

        // Check if seen in this session
        const hasSeen = sessionStorage.getItem("recruiter_notified")
        if (hasSeen) return

        const timer = setTimeout(() => {
            setScanning(true)
            setIsVisible(true)

            // Switch from "Scanning" to "Detected" after 1 second
            setTimeout(() => {
                setScanning(false)
                sessionStorage.setItem("recruiter_notified", "true")
            }, 1000)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const scrollToProjects = () => {
        const section = document.getElementById("projects")
        if (section) {
            section.scrollIntoView({ behavior: "smooth" })

            // Trigger temporary glow on projects section
            section.classList.add("projects-glow-active")
            setTimeout(() => {
                section.classList.remove("projects-glow-active")
            }, 2000)
        }
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100, x: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed bottom-6 right-6 z-[1001] w-full max-w-[340px]"
                >
                    <div className="relative overflow-hidden group">
                        {/* Animated Glow Border */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity bg-size-200 animate-pulse" />

                        <div className="relative bg-[#030712]/90 backdrop-blur-2xl border border-cyan-500/20 rounded-2xl p-5 shadow-2xl">
                            {/* HUD Elements */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex">
                                        <Search className={`w-4 h-4 ${scanning ? 'text-amber-400' : 'text-cyan-400'}`} />
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className={`absolute inset-0 rounded-full blur-md ${scanning ? 'bg-amber-400' : 'bg-cyan-400'}`}
                                        />
                                    </div>
                                    <span className="text-[10px] font-mono font-black tracking-[0.2em] text-cyan-500/70 uppercase">Neural Scanner</span>
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-zinc-600 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Main Content */}
                            <div className="space-y-3">
                                <AnimatePresence mode="wait">
                                    {scanning ? (
                                        <motion.div
                                            key="scanning"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-1"
                                        >
                                            <h4 className="text-amber-400 font-bold text-sm tracking-tight flex items-center gap-2">
                                                <ShieldAlert className="w-4 h-4 animate-pulse" />
                                                SCANNING VISITOR...
                                            </h4>
                                            <p className="text-zinc-500 text-xs font-mono font-bold leading-relaxed">
                                                Identifying network signatures...
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="detected"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-1"
                                        >
                                            <h4 className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                RECRUITER DETECTED
                                            </h4>
                                            <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                                                Optimizing view for technical evaluation...
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!scanning && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col gap-2 pt-2"
                                    >
                                        <button
                                            onClick={scrollToProjects}
                                            className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black text-[11px] font-black uppercase py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                        >
                                            <Zap className="w-3 h-3 fill-current" />
                                            View Best Projects
                                        </button>
                                        <button
                                            onClick={() => setIsVisible(false)}
                                            className="w-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-[10px] font-bold uppercase py-2 rounded-lg border border-white/5 transition-all font-mono"
                                        >
                                            Ignore
                                        </button>
                                    </motion.div>
                                )}
                            </div>

                            {/* Decorative Corner */}
                            <div className="absolute -bottom-1 -right-1 p-3 pointer-events-none opacity-20">
                                <div className="w-4 h-4 border-b border-r border-cyan-500 rounded-br-md" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
