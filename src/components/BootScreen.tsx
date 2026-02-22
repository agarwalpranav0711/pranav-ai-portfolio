"use client"
import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

const BOOT_SEQUENCE = [
    "> Initializing PRANAV.EXE",
    "> Loading neural modules...",
    "> Syncing GitHub systems...",
    "> Launching AI interface...",
    "> Access granted."
]

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
    const [completedLines, setCompletedLines] = useState<string[]>([])
    const [currentLineText, setCurrentLineText] = useState("")
    const [lineIndex, setLineIndex] = useState(0)

    const handleComplete = useCallback(() => {
        sessionStorage.setItem("introSeen", "true")
        onComplete()
    }, [onComplete])

    useEffect(() => {
        // Session Check - Smart Behavior: Skip if already seen in this session
        const hasSeen = sessionStorage.getItem("introSeen")
        if (hasSeen) {
            onComplete()
            return
        }

        if (lineIndex < BOOT_SEQUENCE.length) {
            const targetText = BOOT_SEQUENCE[lineIndex]
            let charIndex = 0

            const typingInterval = setInterval(() => {
                if (charIndex <= targetText.length) {
                    setCurrentLineText(targetText.slice(0, charIndex))
                    charIndex++
                } else {
                    clearInterval(typingInterval)
                    setTimeout(() => {
                        setCompletedLines(prev => [...prev, targetText])
                        setCurrentLineText("")
                        setLineIndex(prev => prev + 1)
                    }, 60) // Even faster delay between lines
                }
            }, 14) // Slightly faster typing speed

            return () => clearInterval(typingInterval)
        } else {
            // Sequence Finished
            const timer = setTimeout(() => {
                handleComplete()
            }, 200) // Reduced final delay
            return () => clearTimeout(timer)
        }
    }, [lineIndex, onComplete, handleComplete])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }} // Even faster exit
            className="fixed inset-0 z-[9999] bg-[#030712] flex flex-col items-center justify-center p-6 font-mono selection:bg-cyan-500/30 overflow-hidden"
        >
            <div className="w-full max-w-md space-y-2 relative z-10 text-center">
                {/* Render fixed completed lines */}
                {completedLines.map((line, i) => (
                    <div key={i} className="text-cyan-400/50 text-xs md:text-sm tracking-tight">
                        {line}
                    </div>
                ))}

                {/* Render currently typing line */}
                {lineIndex < BOOT_SEQUENCE.length && (
                    <div className="text-cyan-400 text-xs md:text-sm flex items-center justify-center tracking-tight">
                        {currentLineText}
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="w-2 h-4 bg-cyan-400 ml-1 shadow-[0_0_8px_#22d3ee]"
                        />
                    </div>
                )}
            </div>

            {/* Cinematic HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,255,0.03),rgba(0,255,255,0.01),rgba(0,255,255,0.03))] bg-[length:100%_2px,3px_100%]" />
            </div>

            {/* Skip Intro Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={handleComplete}
                className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-[10000] flex items-center gap-1.5 group cursor-pointer pointer-events-auto p-2"
            >
                <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-cyan-400/40 group-hover:text-cyan-400 transition-all duration-300">
                    Skip →
                </span>
                <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/20 transition-all duration-300 rounded-sm bg-cyan-500/0 group-hover:bg-cyan-500/5" />
            </motion.button>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                <div className="flex gap-1.5">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                            className="w-1.2 h-1.2 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]"
                        />
                    ))}
                </div>
                <span className="text-[7px] md:text-[8px] uppercase tracking-[0.5em] text-cyan-900 font-bold whitespace-nowrap">
                    System Secure Handshake
                </span>
            </div>
        </motion.div>

    )
}

