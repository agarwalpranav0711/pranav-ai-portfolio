"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Github, Zap, Shield, Target, Cpu, X, Terminal, BarChart3, Languages } from "lucide-react"

interface GithubData {
    login: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    total_stars: number;
    top_languages: string[];
    most_starred_repo: string;
}

export default function GitHubAnalyzer() {
    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState("")
    const [isScanning, setIsScanning] = useState(false)
    const [scanStep, setScanStep] = useState(0)
    const [result, setResult] = useState<{ user: GithubData; pranav: GithubData; score: number } | null>(null)
    const [error, setError] = useState<string | null>(null)

    const scanMessages = [
        "Initializing developer scan...",
        "Fetching GitHub intelligence...",
        "Analyzing repositories...",
        "Calculating technical compatibility...",
        "Generating neural profile..."
    ]

    const fetchUserData = async (uname: string): Promise<GithubData> => {
        const userRes = await fetch(`https://api.github.com/users/${uname}`)
        if (!userRes.ok) throw new Error(userRes.status === 404 ? "User not found" : "API limit reached")
        const userData = await userRes.json()

        const reposRes = await fetch(`https://api.github.com/users/${uname}/repos?per_page=100&sort=updated`)
        if (!reposRes.ok) throw new Error("Could not fetch repositories")
        const reposData = await reposRes.json()

        // Calculate stars
        const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)

        // Calculate languages
        const languages: Record<string, number> = {}
        reposData.forEach((repo: any) => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1
            }
        })
        const topLanguages = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(l => l[0])

        // Most starred repo
        const mostStarred = reposData.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)[0]?.name || "None"

        return {
            login: userData.login,
            avatar_url: userData.avatar_url,
            public_repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            created_at: userData.created_at,
            total_stars: totalStars,
            top_languages: topLanguages,
            most_starred_repo: mostStarred
        }
    }

    const runAnalysis = async () => {
        if (!username.trim()) return
        setError(null)
        setIsScanning(true)
        setScanStep(0)
        setResult(null)

        // Scanning animation steps
        const stepInterval = setInterval(() => {
            setScanStep(prev => (prev < scanMessages.length - 1 ? prev + 1 : prev))
        }, 800)

        try {
            const [visitorData, pranavData] = await Promise.all([
                fetchUserData(username),
                fetchUserData("agarwalpranav0711")
            ])

            // Calculate score
            let score = 40 // Base score

            // Language compatibility
            const sharedLangs = visitorData.top_languages.filter(l => pranavData.top_languages.includes(l))
            score += sharedLangs.length * 15

            // Repo volume similarity
            const repoDiff = Math.abs(visitorData.public_repos - pranavData.public_repos)
            if (repoDiff < 10) score += 15
            else if (repoDiff < 25) score += 5

            // Account age similarity
            const visitorAge = new Date().getFullYear() - new Date(visitorData.created_at).getFullYear()
            const pranavAge = new Date().getFullYear() - new Date(pranavData.created_at).getFullYear()
            if (Math.abs(visitorAge - pranavAge) <= 2) score += 10

            score = Math.min(score, 100)

            clearInterval(stepInterval)
            setTimeout(() => {
                setResult({ user: visitorData, pranav: pranavData, score })
                setIsScanning(false)
            }, 500)

        } catch (err: any) {
            clearInterval(stepInterval)
            setIsScanning(false)
            setError(err.message === "User not found" ? "Developer not found in GitHub database" : "GitHub intelligence temporarily limited")
        }
    }

    return (
        <>
            <div className="flex justify-center py-12">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="group relative px-8 py-4 bg-transparent order border-cyan-500/30 rounded-xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
                    <div className="relative flex items-center gap-3">
                        <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-sm font-mono font-bold tracking-[0.2em] text-cyan-400">ANALYZE YOUR GITHUB LIKE AN AI</span>
                    </div>
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="relative w-full max-w-4xl bg-zinc-950 border border-cyan-500/20 rounded-2xl overflow-hidden flex flex-col shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-cyan-500/5">
                                <div className="flex items-center gap-2">
                                    <Github className="w-4 h-4 text-cyan-400" />
                                    <span className="text-xs font-mono font-bold tracking-[0.3em] text-zinc-400 uppercase">System_Identifier / GitHub_Scanner</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="text-zinc-600 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {!result && !isScanning && (
                                <div className="p-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20">
                                        <Zap className="w-8 h-8 text-cyan-400" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Technical Compatibility Scan</h3>
                                    <p className="text-zinc-500 text-sm mb-8 max-w-xs font-medium">Input your GitHub identifier to synchronize neural compatibility with Pranav's profile.</p>

                                    <div className="w-full max-w-sm flex gap-3">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter GitHub username"
                                            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                                        />
                                        <button
                                            onClick={runAnalysis}
                                            className="px-6 py-3 bg-cyan-500 text-black font-black text-xs uppercase rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                        >
                                            Scan
                                        </button>
                                    </div>
                                    {error && <p className="mt-4 text-red-500 font-mono text-xs">{error}</p>}
                                </div>
                            )}

                            {isScanning && (
                                <div className="p-12 flex flex-col items-center justify-center h-[400px]">
                                    <div className="relative w-24 h-24 mb-12">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ rotate: -360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-2 border-2 border-blue-500/20 border-b-blue-500 rounded-full"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Search className="w-8 h-8 text-cyan-400 animate-pulse" />
                                        </div>
                                    </div>

                                    <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-6">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(scanStep + 1) * 20}%` }}
                                            className="h-full bg-cyan-500"
                                        />
                                    </div>

                                    <motion.p
                                        key={scanStep}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] font-bold"
                                    >
                                        {scanMessages[scanStep]}
                                    </motion.p>
                                </div>
                            )}

                            {result && (
                                <div className="p-8 flex-grow overflow-y-auto scrollbar-hide">
                                    <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                                        {/* Score Wheel */}
                                        <div className="relative w-40 h-40 flex-shrink-0 mx-auto md:mx-0">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle cx="80" cy="80" r="70" className="stroke-white/5 fill-none" strokeWidth="12" />
                                                <motion.circle
                                                    cx="80" cy="80" r="70"
                                                    className="stroke-cyan-500 fill-none"
                                                    strokeWidth="12"
                                                    strokeDasharray="440"
                                                    initial={{ strokeDashoffset: 440 }}
                                                    animate={{ strokeDashoffset: 440 - (440 * result.score) / 100 }}
                                                    transition={{ duration: 2, ease: "easeOut" }}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-4xl font-black text-white">{result.score}%</span>
                                                <span className="text-[8px] font-mono text-zinc-500 tracking-widest uppercase mt-1">Match Index</span>
                                            </div>
                                        </div>

                                        <div className="flex-grow space-y-4">
                                            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                                <img src={result.user.avatar_url} className="w-12 h-12 rounded-xl" alt="avatar" />
                                                <div>
                                                    <h4 className="text-xl font-bold text-white uppercase tracking-tight">{result.user.login}</h4>
                                                    <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Neural Link Synchronized</p>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Target className="w-4 h-4 text-cyan-400" />
                                                    <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">Compatibility Result</span>
                                                </div>
                                                <p className="text-sm text-zinc-300 font-medium">
                                                    {result.score > 80 ? "You both are high-tier AI-focused builders." :
                                                        result.score > 50 ? "Significant technical overlap detected across core systems." :
                                                            "Unique path divergency. Different but powerful architectural focus."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <StatBox icon={<Terminal />} label="Repos" value={result.user.public_repos} />
                                        <StatBox icon={<BarChart3 />} label="Total Stars" value={result.user.total_stars} />
                                        <StatBox icon={<Languages />} label="Main Lang" value={result.user.top_languages[0] || "None"} />
                                        <StatBox icon={<Shield />} label="Followers" value={result.user.followers} />
                                    </div>

                                    <button
                                        onClick={() => setResult(null)}
                                        className="w-full mt-8 py-3 font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-600 hover:text-cyan-400 transition-colors"
                                    >
                                        Reset System Analyzer
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

function StatBox({ icon, label, value }: { icon: any, label: string, value: any }) {
    return (
        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center gap-2 text-zinc-600">
                {React.cloneElement(icon, { className: "w-3 h-3" })}
                <span className="text-[9px] font-mono uppercase tracking-[0.2em]">{label}</span>
            </div>
            <span className="text-lg font-black text-white">{value}</span>
        </div>
    )
}
