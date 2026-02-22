"use client"
import React, { useEffect, useState } from "react"
import { GitHubCalendar } from "react-github-calendar"
import { motion } from "framer-motion"
import { Github, GitCommit, Star, Monitor, Terminal, Users, Clock } from "lucide-react"

interface GitHubStats {
    publicRepos: number;
    followers: number;
    totalStars: number;
    lastUpdated: string;
}

export default function GitHubActivity() {
    const username = "agarwalpranav0711"
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        async function fetchStats() {
            try {
                const res = await fetch("/api/github", { cache: "no-store" });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setStats(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const getTimeAgo = (dateStr: string) => {
        const now = new Date();
        const past = new Date(dateStr);
        const diffTime = Math.abs(now.getTime() - past.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        return `${diffDays} days ago`;
    };

    const calendarTheme = {
        light: ["#0e0e10", "#06b6d4", "#0891b2", "#0e7490", "#155e75"],
        dark: ["#0e0e10", "#0e3b44", "#06b6d4", "#22d3ee", "#67e8f9"],
    }

    return (
        <section className="relative py-36 md:py-52 px-6 md:px-12 bg-black overflow-hidden" id="github">
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <Terminal className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">Contribution Log</span>
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white tracking-tighter"
                        >
                            DEVELOPER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ACTIVITY LOG</span>
                        </motion.h3>
                    </div>

                    <motion.a
                        whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://github.com/${username}`}
                        target="_blank"
                        className="flex items-center gap-3 px-6 py-3 bg-[#030712]/50 backdrop-blur-xl border border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all font-mono text-xs"
                    >
                        <Github className="w-4 h-4" />
                        VIEW_FULL_PROFILE
                    </motion.a>
                </div>

                {error ? (
                    <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-red-500 font-mono text-sm text-center mb-8">
                        &gt; ERROR: {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={<GitCommit className="text-cyan-400" />}
                            label="Public Repositories"
                            value={loading ? "..." : stats?.publicRepos.toString() || "0"}
                            delay={0.1}
                        />
                        <StatCard
                            icon={<Star className="text-amber-400" />}
                            label="Total Stars"
                            value={loading ? "..." : stats?.totalStars.toString() || "0"}
                            delay={0.2}
                        />
                        <StatCard
                            icon={<Users className="text-blue-400" />}
                            label="Followers"
                            value={loading ? "..." : stats?.followers.toString() || "0"}
                            delay={0.3}
                        />
                        <StatCard
                            icon={<Clock className="text-emerald-400" />}
                            label="Last Active"
                            value={loading ? "..." : stats ? getTimeAgo(stats.lastUpdated) : "N/A"}
                            delay={0.4}
                        />
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative p-8 rounded-3xl bg-[#030712]/40 backdrop-blur-2xl border border-white/5 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Github className="w-32 h-32" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center min-h-[180px] justify-center">
                        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
                            <div className="min-w-[800px] flex justify-center">
                                {mounted ? (
                                    <GitHubCalendar
                                        username={username}
                                        theme={calendarTheme}
                                        fontSize={12}
                                        blockSize={12}
                                        blockMargin={4}
                                        colorScheme="dark"
                                    />
                                ) : (
                                    <div className="h-[155px] w-full bg-white/5 animate-pulse rounded-lg" />
                                )}
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-6 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm bg-[#0e3b44]" />
                                Low Intensity
                            </span>
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-sm bg-[#67e8f9] shadow-[0_0_8px_#67e8f9]" />
                                Peak Performance
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function StatCard({ icon, label, value, delay }: { icon: any, label: string, value: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="p-6 rounded-2xl bg-[#030712]/60 backdrop-blur-xl border border-white/5 flex items-center gap-6 hover:border-cyan-500/20 transition-all group"
        >
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase mb-1 whitespace-nowrap">{label}</p>
                <p className="text-2xl font-black text-white">{value}</p>
            </div>
        </motion.div>
    )
}
