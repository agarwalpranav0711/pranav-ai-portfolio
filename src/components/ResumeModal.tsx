"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Linkedin, AlertCircle, FileText } from "lucide-react"

interface ResumeModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#030712]/80 border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(34,211,238,0.1)] backdrop-blur-2xl overflow-hidden"
                    >
                        {/* Decorative Background HUD */}
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <div className="text-[40px] font-black font-mono">RESUME_V2</div>
                        </div>

                        {/* Top Accent Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all group"
                        >
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            {/* Icon/Avatar */}
                            <div className="mb-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
                                <AlertCircle className="w-10 h-10 text-cyan-400" />
                            </div>

                            <h3 className="text-2xl font-black text-white tracking-tight mb-4 uppercase italic">
                                System Update in Progress
                            </h3>

                            <p className="text-zinc-400 leading-relaxed mb-10 max-w-sm">
                                Resume currently being upgraded with latest <span className="text-cyan-400 font-bold italic">AI systems</span> and projects. <br />
                                <span className="text-zinc-500 text-sm mt-2 block">Available on request.</span>
                            </p>

                            <div className="flex flex-col gap-4 w-full">
                                <motion.a
                                    href="https://drive.google.com/file/d/1lefZ2lmMJHui9yvQsjzfKp_zRO7xdiN-/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center justify-center gap-3 px-6 py-4 bg-cyan-500 text-black rounded-2xl font-bold text-sm hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                >
                                    <FileText className="w-4 h-4" />
                                    VIEW RESUME (GOOGLE DRIVE)
                                </motion.a>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <motion.a
                                        href="mailto:agarwalpranav0711@gmail.com"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-3 px-6 py-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 font-bold text-sm hover:bg-cyan-500/20 transition-all"
                                    >
                                        <Mail className="w-4 h-4" />
                                        EMAIL ME
                                    </motion.a>

                                    <motion.a
                                        href="https://www.linkedin.com/in/pranavagarwal07"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:bg-zinc-200 transition-all"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        LINKEDIN
                                    </motion.a>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Scanner Decoration */}
                        <motion.div
                            animate={{ y: [0, 400, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none"
                        />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
