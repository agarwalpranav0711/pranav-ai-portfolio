"use client"
import React from "react"
import { motion } from "framer-motion"
import { Code2, Server, Database, BrainCircuit, Terminal, Workflow } from "lucide-react"

const skillCategories = [
    {
        title: "FRONTEND STACK",
        icon: <Code2 className="w-5 h-5" />,
        skills: ["HTML / CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
        color: "cyan"
    },
    {
        title: "BACKEND & FULL STACK",
        icon: <Server className="w-5 h-5" />,
        skills: ["Node.js", "Express", "Next.js API Routes", "NextAuth", "Socket.io (Basic)"],
        color: "blue"
    },
    {
        title: "DATABASES",
        icon: <Database className="w-5 h-5" />,
        skills: ["MongoDB", "Mongoose", "LocalStorage"],
        color: "indigo"
    },
    {
        title: "APIS & AI INTEGRATION",
        icon: <BrainCircuit className="w-5 h-5" />,
        skills: ["Google Gemini API", "GitHub / npm APIs", "REST APIs", "JSON Handling"],
        color: "cyan"
    },
    {
        title: "AUTOMATION",
        icon: <Workflow className="w-5 h-5" />,
        skills: ["n8n (Workflow Automation)"],
        color: "emerald"
    },
    {
        title: "DEVELOPER TOOLS",
        icon: <Terminal className="w-5 h-5" />,
        skills: ["Git & GitHub", "Vercel", "Postman / VS Code", "Mermaid.js"],
        color: "zinc"
    }
]

export default function Skills() {
    return (
        <section className="relative py-36 md:py-52 px-6 md:px-12 bg-black overflow-hidden" id="skills">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <span className="w-8 h-[1px] bg-cyan-500" />
                        <h2 className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">Development Stack</h2>
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white tracking-tighter"
                    >
                        TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">EXPERIENCE</span>
                    </motion.h3>
                    <p className="mt-4 text-zinc-500 max-w-lg font-medium text-sm md:text-base">
                        Actively building and shipping projects with modern full-stack tools and AI integrations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, idx) => (
                        <SkillCard key={idx} category={category} delay={idx * 0.05} />
                    ))}
                </div>

                {/* Console Footnote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 flex justify-center"
                >
                    <div className="px-6 py-3 rounded-xl border border-white/5 bg-white/[0.01] flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                            SYSTEM STATUS: CONTINUOUS LEARNING & BUILDING
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function SkillCard({ category, delay }: { category: any, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="group relative"
        >
            <div className="relative h-full bg-[#030712]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_-10px_rgba(6,182,212,0.2)]">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-white/5 text-zinc-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors border border-transparent group-hover:border-cyan-500/20">
                        {category.icon}
                    </div>
                    <h4 className="text-xs font-bold text-white tracking-widest uppercase">
                        {category.title}
                    </h4>
                </div>

                {/* Real Skills List */}
                <ul className="space-y-4">
                    {category.skills.map((skill: string, i: number) => (
                        <li key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-[1px] bg-cyan-500/50 group-hover:w-2 group-hover:bg-cyan-400 transition-all" />
                            <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors font-medium">
                                {skill}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 right-0 w-12 h-12 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-full border-b border-r border-cyan-500/30 rounded-br-lg" />
                </div>
            </div>
        </motion.div>
    )
}
