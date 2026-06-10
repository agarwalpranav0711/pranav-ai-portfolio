"use client"
import React, { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, Coffee, Activity, Brain, Users, Layout, Twitter, Terminal, Cpu, Network } from "lucide-react"
import Script from "next/script"

// Types for components
interface Project {
    title: string;
    description: string;
    tech: string[];
    github: string;
    live: string;
    icon: React.ReactNode;
    color: string;
    diagram: string;
}

const projects: Project[] = [
    {
        title: "NEXUS — AI Operating System",
        description: "Multi-agent AI Operating System that executes real-world actions from single natural language commands. Features 5 parallel specialist agents (asyncio), live SSE streaming reasoning feeds, and human-in-the-loop approval governance.",
        tech: ["FastAPI", "Next.js", "TypeScript", "Groq", "Google OAuth2", "n8n"],
        github: "https://github.com/agarwalpranav0711/nexus-os",
        live: "#",
        icon: <Terminal className="w-5 h-5" />,
        color: "from-red-500 to-orange-600",
        diagram: `graph TD
      Query[User Query] --> Router[LLM Router]
      Router --> Agents[5 Parallel Agents]
      Agents --> Gateway[Approval Gateway]
      Gateway --> Exec[Execution Engine]`
    },
    {
        title: "Ether OS",
        description: "Sovereign multi-agent orchestration layer designed for recursive task decomposition and parallel execution. Uses a Manager-Worker architecture to synthesize complex objectives into high-fidelity strategic briefs.",
        tech: ["FastAPI", "Next.js", "Zustand", "Framer Motion", "TailwindCSS", "PostgreSQL"],
        github: "https://github.com/agarwalpranav0711/ether-os",
        live: "https://ether-os.vercel.app",
        icon: <Network className="w-5 h-5" />,
        color: "from-indigo-500 to-cyan-500",
        diagram: `graph TD
      Obj[Objective] --> Mgr[Manager Node]
      Mgr --> W1[Worker A]
      Mgr --> W2[Worker B]
      W1 & W2 --> Synth[Synthesizer]
      Synth --> Brief[Strategic Brief]`
    },
    {
        title: "Get Me A Chai",
        description: "Full-stack creator monetization platform. Built with Next.js and MongoDB, featuring secure NextAuth integration for creators to receive payments and messages.",
        tech: ["Next.js", "MongoDB", "NextAuth", "Razorpay"],
        github: "https://github.com/agarwalpranav0711/get-me-a-chai",
        live: "#",
        icon: <Coffee className="w-5 h-5" />,
        color: "from-amber-500 to-orange-600",
        diagram: `graph LR
      User((User)) --> Next[Next.js Frontend]
      Next --> API[API Routes]
      API --> DB[(MongoDB)]
      API --> Pay[Payment System]
      Pay --> Webhook[Status Update]
      Webhook --> DB`
    },
    {
        title: "PersonaX",
        description: "AI behavioral analysis engine powered by Google Gemini. Processes linguistic patterns to generate comprehensive psychological profiles and personality reports.",
        tech: ["Gemini API", "React", "Node.js", "Tailwind"],
        github: "https://github.com/agarwalpranav0711/personax",
        live: "https://personax-sepia.vercel.app/",
        icon: <Brain className="w-5 h-5" />,
        color: "from-purple-500 to-indigo-600",
        diagram: `graph TD
      U((User)) --> F[Frontend]
      F --> G[Gemini API]
      G --> P[Pattern Engine]
      P --> R[Analysis Report]
      R --> F`
    },
    {
        title: "AI Collab Studio",
        description: "Real-time collaborative editing environment with multi-user sync. Features an AI-powered writing assistant for seamless document co-authoring.",
        tech: ["WebSockets", "Next.js", "AI SDK", "Tiptap"],
        github: "https://github.com/agarwalpranav0711/ai-collab-studio",
        live: "#",
        icon: <Users className="w-5 h-5" />,
        color: "from-emerald-500 to-teal-600",
        diagram: `graph TB
      UA((User A)) <--> S[Socket.io Server]
      UB((User B)) <--> S
      S --> AI[AI Agent Assist]
      S <--> DB[(Real-time DB)]`
    },
    {
        title: "Architect Bot",
        description: "Generative infrastructure designer. Converts natural language system requirements into professional architecture diagrams using AI and Mermaid.js.",
        tech: ["LLMs", "Mermaid.js", "TypeScript", "Vite"],
        github: "https://github.com/agarwalpranav0711/architect-bot",
        live: "https://architect-bot-smoky.vercel.app/",
        icon: <Layout className="w-5 h-5" />,
        color: "from-blue-500 to-cyan-600",
        diagram: `graph LR
      Input[Natural Language] --> LLM[AI Processor]
      LLM --> MD[Mermaid DSL]
      MD --> Render[Static Engine]
      Render --> UI[Visual System]`
    },
    {
        title: "NPM Health Scanner",
        description: "Diagnostic utility for the JavaScript ecosystem. Analyzes package health by cross-referencing npm and GitHub metrics to generate a maintainability score.",
        tech: ["NPM API", "GitHub API", "React", "Chart.js"],
        github: "https://github.com/agarwalpranav0711/npm-health-scanner",
        live: "https://npm-health-scanner.vercel.app/",
        icon: <Activity className="w-5 h-5" />,
        color: "from-rose-500 to-red-600",
        diagram: `graph TD
      U((User)) --> S[Scanner Core]
      S --> NPM[NPM Registry API]
      S --> GH[GitHub Repo API]
      NPM & GH --> Logic[Score Engine]
      Logic --> Viz[Chart.js Output]`
    },
    {
        title: "Twitter UI Clone",
        description: "High-fidelity responsive recreation of the X/Twitter interface. Focused on achieving pixel-perfect CSS layout precision and fluidity.",
        tech: ["React", "Tailwind CSS", "Framer Motion"],
        github: "https://github.com/agarwalpranav0711/x-ui-clone",
        live: "#",
        icon: <Twitter className="w-5 h-5" />,
        color: "from-sky-400 to-blue-500",
        diagram: `graph TD
      UI[React Components] --> Style[Tailwind Engine]
      Style --> Anim[Framer Motion]
      Anim --> Display[Pixel Perfect Render]`
    }
]

export default function Projects() {
    const containerRef = useRef<HTMLElement>(null)
    const [isArchitectMode, setIsArchitectMode] = useState(false)
    const [mermaidLabel, setMermaidLabel] = useState(0) // Force re-render of mermaid divs

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150])

    useEffect(() => {
        if (isArchitectMode && (window as any).mermaid) {
            setTimeout(() => {
                (window as any).mermaid.contentLoaded();
            }, 100);
        }
        setMermaidLabel(prev => prev + 1)
    }, [isArchitectMode])

    const onMermaidLoad = () => {
        if ((window as any).mermaid) {
            (window as any).mermaid.initialize({
                startOnLoad: true,
                theme: "dark",
                securityLevel: "loose",
                fontFamily: "monospace",
            });
        }
    }

    return (
        <section ref={containerRef} className="relative py-36 md:py-52 px-6 md:px-12 bg-black overflow-hidden" id="projects">
            <Script
                src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
                onLoad={onMermaidLoad}
            />

            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-[0.03]">
                    <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]" />
                </motion.div>
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[160px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[160px] delay-1000 animate-pulse" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-cyan-500" />
                        <span className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.5em] uppercase">
                            <Terminal className="w-4 h-4 animate-pulse" />
                            Build Inventory
                        </span>
                        <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-cyan-500" />
                    </motion.div>

                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-8xl font-black text-white tracking-tighter text-center mb-12"
                    >
                        LATEST <br className="md:hidden" />
                        <span className="relative inline-block px-4">
                            DEPLOYMENTS
                            <motion.span
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="absolute bottom-2 left-0 h-1 md:h-2 bg-cyan-500/40 -z-10"
                            />
                        </span>
                    </motion.h3>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsArchitectMode(!isArchitectMode)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 ${isArchitectMode
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                            : 'bg-white/5 border-white/10 text-zinc-500 hover:border-white/20'
                            }`}
                    >
                        <Network className={`w-4 h-4 ${isArchitectMode ? 'animate-pulse' : ''}`} />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
                            {isArchitectMode ? 'ARCHITECT MODE: ACTIVE' : 'ENABLE ARCHITECT MODE'}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${isArchitectMode ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-zinc-700'}`} />
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={`${index}-${mermaidLabel}`}
                            project={project}
                            index={index}
                            isArchitectMode={isArchitectMode}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectCard({ project, index, isArchitectMode }: { project: Project, index: number, isArchitectMode: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isArchitectMode) return
        const rect = cardRef.current.getBoundingClientRect()
        const relativeX = (e.clientX - rect.left) / rect.width - 0.5
        const relativeY = (e.clientY - rect.top) / rect.height - 0.5
        x.set(relativeX)
        y.set(relativeY)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            layout
            className="perspective-1000"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                layout
                style={{
                    rotateX: isArchitectMode ? 0 : rotateX,
                    rotateY: isArchitectMode ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`group relative h-full bg-[#030712]/40 backdrop-blur-2xl border transition-all duration-700 rounded-3xl p-8 flex flex-col overflow-hidden ${isArchitectMode ? 'border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] bg-cyan-950/5' : 'border-white/5 hover:border-cyan-500/30'
                    }`}
            >
                <div className="relative z-10 flex flex-col h-full" style={{ transform: !isArchitectMode ? "translateZ(40px)" : "none" }}>
                    <div className="flex justify-between items-center mb-8">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${project.color} bg-opacity-10 border border-white/10 text-white shadow-xl`}>
                            {project.icon}
                        </div>
                        <div className="flex gap-4">
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, color: "rgba(34, 211, 238, 1)" }}
                                className="text-zinc-500 transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </motion.a>
                            {project.live !== "#" && (
                                <div className="group/live relative">
                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, color: "rgba(34, 211, 238, 1)" }}
                                        className="text-zinc-500 transition-colors"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </motion.a>

                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-cyan-500 text-black text-[10px] font-bold rounded-lg opacity-0 group-hover/live:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                        View Live System
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-cyan-500" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                        {project.title}
                    </h4>

                    <AnimatePresence mode="wait">
                        {isArchitectMode ? (
                            <motion.div
                                key="architect"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6"
                            >
                                <div className="p-4 bg-black/40 border border-cyan-500/20 rounded-2xl overflow-hidden min-h-[150px] flex flex-col items-center justify-center">
                                    <div className="flex items-center gap-2 mb-4 w-full">
                                        <Cpu className="w-3 h-3 text-cyan-400" />
                                        <span className="text-[10px] font-mono text-cyan-400/70 tracking-widest uppercase">Process Flow Schema</span>
                                    </div>
                                    {/* Mermaid class-based div */}
                                    <div className="mermaid w-full flex justify-center scale-90 md:scale-100">
                                        {project.diagram}
                                    </div>
                                </div>
                                <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
                                    <span className="text-[9px] font-mono text-zinc-500 block mb-1 tracking-widest uppercase">System Summary</span>
                                    <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">Architectural verification successful. Logical nodes synchronized.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="normal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col h-full"
                            >
                                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow font-medium">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                    {project.tech.map((t: string) => (
                                        <span key={t} className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-[0.1em] uppercase bg-white/5 text-zinc-300 border border-white/10 rounded-lg group-hover:border-cyan-500/20 transition-all duration-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                    <div className="absolute bottom-6 right-6 flex flex-col gap-0.5 items-end font-mono text-[7px] text-cyan-500">
                        <span>MOD: {isArchitectMode ? 'ARCH' : 'DESC'}</span>
                        <span>OS: PRANAV_SYS</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
