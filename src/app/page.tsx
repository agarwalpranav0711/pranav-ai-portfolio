"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import About from "@/components/About"
import GitHubActivity from "@/components/GitHubActivity"
import Terminal from "@/components/Terminal"
import BootScreen from "@/components/BootScreen"
import RecruiterDetector from "@/components/RecruiterDetector"
import AIChat from "@/components/AIChat"
import GitHubAnalyzer from "@/components/GitHubAnalyzer"
import VisitorCounter from "@/components/VisitorCounter"
import InterviewMode from "@/components/InterviewMode"
import RecruiterDecision from "@/components/RecruiterDecision"
import Footer from "@/components/Footer"
import { AnimatePresence } from "framer-motion"














export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [showMain, setShowMain] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("introSeen")) {
      setShowMain(true)
    }

    const move = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])


  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* mouse glow */}
      <div
        style={{
          position: "fixed",
          left: mouse.x - 150,
          top: mouse.y - 150,
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(0,255,255,0.15)",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      <AnimatePresence mode="wait">
        {!showMain && (
          <BootScreen key="boot-screen" onComplete={() => setShowMain(true)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showMain ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={!showMain ? "pointer-events-none fixed inset-0 overflow-hidden" : "relative"}
      >
        <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
          {/* rotating rings container */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* ring 1 */}
            <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-2 border-cyan-400/40 border-t-cyan-400 animate-spin"></div>

            {/* ring 2 */}
            <div className="absolute w-[450px] h-[450px] md:w-[700px] md:h-[700px] rounded-full border-2 border-cyan-500/20 border-r-cyan-500 animate-spin-reverse"></div>

            {/* ring 3 - optional decorative */}
            <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border border-cyan-900/10 border-l-cyan-500/30 animate-spin-slow"></div>
          </div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showMain ? 1 : 0, scale: showMain ? 1 : 0.8 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-[130px] font-extrabold text-white tracking-tighter drop-shadow-[0_0_35px_rgba(34,211,238,0.5)]"
          >
            PRANAV
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showMain ? 1 : 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-lg md:text-2xl text-cyan-400/80 font-mono tracking-widest"
          >
            BUILDING CRAZY AI SYSTEMS & EXPERIMENTS
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showMain ? 1 : 0, y: showMain ? 0 : 20 }}
            transition={{ delay: 0.9 }}
          >
            <InterviewMode />
          </motion.div>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showMain ? 1 : 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
          </motion.div>
        </section>

        <About />
        <Projects />
        <GitHubActivity />
        <GitHubAnalyzer />
        <Skills />

        <Terminal />
        <RecruiterDetector />
        <AIChat />
        <VisitorCounter />
        <RecruiterDecision />
        <Footer />
      </motion.div>


    </main>
  )
}