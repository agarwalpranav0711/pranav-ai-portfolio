"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, FileDown, Globe, MapPin, Cpu, Zap } from "lucide-react"
import ResumeModal from "./ResumeModal"

const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/agarwalpranav0711", icon: <Github className="w-4 h-4" /> },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pranavagarwal07", icon: <Linkedin className="w-4 h-4" /> },
    { label: "Email", href: "mailto:agarwalpranav0711@gmail.com", icon: <Mail className="w-4 h-4" /> },
    { label: "Resume", href: "#", icon: <FileDown className="w-4 h-4" />, isResume: true },
]

export default function Footer() {
    const [isResumeOpen, setIsResumeOpen] = useState(false)

    return (
        <footer className="relative mt-32 px-6 pb-12 pt-24 overflow-hidden border-t border-white/5 bg-black">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Main Branding Section */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]"
                    >
                        This portfolio is a live <span className="text-cyan-400 italic">AI system</span> <br className="hidden md:block" /> engineered by Pranav.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 font-mono text-xs md:text-sm tracking-[0.2em] max-w-2xl uppercase leading-relaxed"
                    >
                        Built using Next.js, AI integrations, automation systems, and real-world experimentation.
                    </motion.p>
                </div>

                {/* Divider with Neon Gradient */}
                <div className="relative h-[1px] w-full bg-white/5 mb-16 overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#22d3ee]"
                    />
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start">

                    {/* Left: System Status */}
                    <div className="space-y-6 order-2 md:order-1">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                                <span className="text-[10px] font-mono font-black text-white tracking-[0.3em] uppercase">System Status: Active</span>
                            </div>

                            <div className="flex items-center gap-3 text-zinc-500">
                                <MapPin className="w-4 h-4 text-cyan-500/50" />
                                <span className="text-xs font-medium">Origin: India</span>
                            </div>

                            <div className="flex items-center gap-3 text-zinc-500">
                                <Zap className="w-4 h-4 text-cyan-500/50" />
                                <span className="text-xs font-medium italic">Mode: Building & Shipping</span>
                            </div>
                        </div>
                    </div>

                    {/* Center: Quick Links */}
                    <div className="flex flex-col items-center gap-6 order-1 md:order-2">
                        <span className="text-[10px] font-mono font-black text-zinc-600 tracking-[0.4em] uppercase">Quick Nodes:</span>
                        <div className="flex flex-wrap justify-center gap-4">
                            {SOCIAL_LINKS.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target={link.isResume ? undefined : "_blank"}
                                    rel={link.isResume ? undefined : "noopener noreferrer"}
                                    onClick={(e) => {
                                        if (link.isResume) {
                                            e.preventDefault()
                                            setIsResumeOpen(true)
                                        }
                                    }}
                                    whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.5)", color: "rgba(255, 255, 255, 1)" }}
                                    className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 text-xs font-bold transition-all group cursor-pointer"
                                >
                                    <span className="text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                                        {link.icon}
                                    </span>
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Vision */}
                    <div className="text-left md:text-right space-y-4 order-3">
                        <div className="flex flex-col md:items-end gap-2">
                            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl w-fit">
                                <Cpu className="w-5 h-5 text-cyan-400" />
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed font-medium max-w-[280px]">
                                Open to internships, collaborations, and ambitious AI projects.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom Line */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
                    <span className="text-[10px] font-mono text-zinc-700 tracking-[0.3em] uppercase">
                        © 2026 Pranav.exe
                    </span>
                    <div className="flex items-center gap-3 opacity-30 group hover:opacity-100 transition-opacity">
                        <Globe className="w-3 h-3 text-cyan-500" />
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                            All systems operational.
                        </span>
                    </div>
                </div>

            </div>

            {/* Decorative HUD Elements */}
            <div className="absolute bottom-0 left-0 p-8 opacity-10 pointer-events-none">
                <div className="w-24 h-[1px] bg-cyan-500 mb-1" />
                <div className="w-12 h-[1px] bg-cyan-500" />
            </div>

            {/* Resume Modal */}
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </footer>
    )
}

