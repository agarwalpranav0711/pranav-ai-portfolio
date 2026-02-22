"use client"
import React from "react"
import { motion } from "framer-motion"
import { User, GraduationCap, Target, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react"

export default function About() {
    return (
        <section className="relative py-36 md:py-52 px-6 md:px-12 bg-black overflow-hidden" id="about">
            {/* Background HUD elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT SIDE: POWERFUL INTRO */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                            <span className="text-cyan-400 font-mono text-xs tracking-[0.5em] uppercase">Identity / Manifest</span>
                        </div>

                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                            I BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">REAL STUFF.</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-medium mb-10 max-w-xl">
                            I'm Pranav, an AI-focused builder obsessed with creating real-world tools, automation systems, and experimental projects.
                            I don't just follow theory—I ship systems that solve actual problems.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://github.com/agarwalpranav0711"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl transition-all"
                            >
                                <div className="flex items-center gap-2">
                                    <Github className="w-5 h-5" />
                                    GITHUB
                                </div>
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://www.linkedin.com/in/pranavagarwal07"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white border border-white/10 font-bold rounded-xl hover:border-cyan-500/50 transition-all font-sans"
                            >
                                <div className="flex items-center gap-2">
                                    <Linkedin className="w-5 h-5 text-cyan-400" />
                                    LINKEDIN
                                </div>
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                href="mailto:agarwalpranav0711@gmail.com"
                                className="flex items-center gap-4 px-6 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold rounded-xl transition-all w-full md:w-auto justify-center"
                            >
                                <div className="flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    STAY IN TOUCH
                                </div>
                            </motion.a>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 p-4 border-l-2 border-cyan-500/30 bg-cyan-500/5 rounded-r-xl inline-block"
                        >
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-cyan-400" />
                                <span className="text-sm font-bold text-cyan-100 tracking-wide uppercase italic">
                                    Available for internships & collab missions
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT SIDE: SYSTEM INFO CARDS */}
                    <div className="grid gap-6">

                        {/* PROFILE CARD */}
                        <AboutCard
                            icon={<User className="text-cyan-400" />}
                            title="SYSTEM_PROFILE"
                            delay={0.1}
                        >
                            <div className="space-y-3 font-mono text-sm uppercase tracking-wider">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-zinc-500">CODENAME:</span>
                                    <span className="text-white font-bold">PRANAV</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-zinc-500">ROLE:</span>
                                    <span className="text-cyan-400 font-bold text-right ml-4">Full-stack & AI Builder</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-zinc-500">ORIGIN:</span>
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <MapPin className="w-3 h-3 text-cyan-400" />
                                        INDIA
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">STATUS:</span>
                                    <span className="text-emerald-400 font-bold flex items-center gap-2 animate-pulse">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        BUILDING SYSTEMS
                                    </span>
                                </div>
                            </div>
                        </AboutCard>

                        {/* EDUCATION CARD */}
                        <AboutCard
                            icon={<GraduationCap className="text-blue-400" />}
                            title="KNOWLEDGE_BASE"
                            delay={0.2}
                        >
                            <h4 className="text-white font-bold mb-2">B.Tech Student</h4>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                Specializing in AI systems & scalable full-stack development.
                                Focused on learning through real-world implementation over pure theory.
                            </p>
                            <ul className="grid grid-cols-2 gap-2">
                                {['GSoC Aspiring', 'Open Source', 'System Design', 'Prompt Eng.'].map(tag => (
                                    <span key={tag} className="text-[10px] py-1 px-2 bg-white/5 rounded border border-white/10 text-zinc-500 text-center">
                                        {tag}
                                    </span>
                                ))}
                            </ul>
                        </AboutCard>

                        {/* FOCUS CARD */}
                        <AboutCard
                            icon={<Target className="text-purple-400" />}
                            title="CURRENT_PRIORITY"
                            delay={0.3}
                        >
                            <div className="space-y-4">
                                {[
                                    { label: "AI Agents", val: "85%" },
                                    { label: "Automation", val: "90%" },
                                    { label: "Architecture", val: "75%" }
                                ].map(item => (
                                    <div key={item.label} className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-mono font-bold tracking-widest text-zinc-500">
                                            <span>{item.label}</span>
                                            <span>{item.val}</span>
                                        </div>
                                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: item.val }}
                                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AboutCard>

                    </div>
                </div>
            </div>
        </section>
    )
}

function AboutCard({ icon, title, children, delay }: { icon: any, title: string, children: any, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ y: -5, borderColor: "rgba(34, 211, 238, 0.4)" }}
            className="p-6 rounded-2xl bg-[#030712]/60 backdrop-blur-xl border border-white/5 transition-all group"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                    {icon}
                </div>
                <h3 className="text-xs font-mono font-bold tracking-[0.3em] text-zinc-500 group-hover:text-cyan-400 transition-colors">
                    {title}
                </h3>
            </div>
            {children}
        </motion.div>
    )
}
