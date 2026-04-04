"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WaveLayer } from "./WaveLayer";

const DEFAULT_STEPS = [
  "Analyzing script and context",
  "Synthesizing natural voice textures",
  "Adjusting prosody and emotional tone",
  "Processing acoustic environment",
  "Polishing final audio master",
] as const;

interface AudioGeneratingAnimatedLoaderProps {
  title?: string;
  subtitle?: string;
  steps?: readonly string[];
  loopIntervalMs?: number;
}

export default function AudioGeneratingAnimatedLoader({
  title = "Generating your audio",
  subtitle = "This may take a few moments",
  steps = DEFAULT_STEPS,
  loopIntervalMs = 3000,
}: AudioGeneratingAnimatedLoaderProps) {
  const safeSteps = useMemo(
    () => (steps.length > 0 ? [...steps] : [...DEFAULT_STEPS]),
    [steps],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSteps.length);
    }, loopIntervalMs);

    return () => clearInterval(timer);
  }, [loopIntervalMs, safeSteps]);

  const activeLine = safeSteps[activeIndex] ?? "";

  // Step history calculation
  const historyIndices = Array.from({ length: 3 }, (_, i) => {
    const idx = (activeIndex - (3 - i) + safeSteps.length) % safeSteps.length;
    return idx;
  });

  return (
    <section className="group relative h-full w-full min-h-[400px] overflow-hidden rounded-2xl bg-[#0a0a0a] flex flex-col shadow-2xl font-sans border border-white/5">
      {/* Premium Background Effects - Purple/Indigo theme for Audio */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#8b5cf6,transparent_75%)] opacity-25 transition-opacity duration-1000 group-hover:opacity-40" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />

      {/* Header with Glassmorphism */}
      <div className="relative z-30 flex items-center justify-between p-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500 shadow-[0_0_10px_#8b5cf6]"></span>
            </span>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-violet-300/60">
              {title}
            </p>
          </div>
          <p className="text-sm text-white/40 font-medium">{subtitle}</p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/2 border border-white/5 backdrop-blur-md">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-violet-500"
            />
          ))}
        </div>
      </div>

      {/* Main Content: Current Step */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white/90 font-serif lowercase italic">
              {activeLine}...
            </h2>
          </motion.div>
        </AnimatePresence>

        {/* History Stream */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:flex flex-col gap-4 opacity-20">
          {historyIndices.map((idx, i) => (
            <motion.p
              key={`${idx}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.15 + i * 0.1, x: 0 }}
              className="text-xs tracking-wider whitespace-nowrap"
            >
              ✓ {safeSteps[idx]}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Wave Section - Fluid & Layered */}
      <div className="relative z-10 w-full h-48 mt-auto overflow-hidden">
        <WaveLayer
          d="M0 80 Q 240 20 480 80 T 960 80 V 160 H 0 Z"
          color="rgba(139, 92, 246, 0.1)"
          duration={15}
          delay={0}
        />
        <WaveLayer
          d="M0 90 Q 240 140 480 90 T 960 90 V 160 H 0 Z"
          color="rgba(139, 92, 246, 0.15)"
          duration={12}
          delay={-2}
        />
        <WaveLayer
          d="M0 60 Q 240 100 480 60 T 960 60 V 160 H 0 Z"
          color="rgba(139, 92, 246, 0.3)"
          duration={10}
          delay={-4}
        />

        {/* Pulse Bar Layer */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-violet-500/50 to-transparent" />
      </div>

      {/* Mesh Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
