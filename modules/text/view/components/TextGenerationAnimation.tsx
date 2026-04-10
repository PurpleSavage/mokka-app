"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiSparkles,
  HiAdjustments,
  HiOutlinePencilAlt,
  HiLightningBolt,
  HiCube,
  HiFilter,
} from "react-icons/hi";
import { LuWand, LuBrain } from "react-icons/lu";

interface Step {
  id: number;
  message: string;
  icon: React.ReactNode;
  color: string;
}

const MESSAGES = [
  {
    message: "Deeply analyzing prompt context...",
    icon: <LuBrain />,
    color: "text-violet-400",
  },
  {
    message: "Calibrating tone for maximum impact...",
    icon: <HiAdjustments />,
    color: "text-pink-400",
  },
  {
    message: "Synthesizing semantic structures...",
    icon: <HiCube />,
    color: "text-blue-400",
  },
  {
    message: "Polishing narrative style...",
    icon: <HiOutlinePencilAlt />,
    color: "text-emerald-400",
  },
  {
    message: "Injecting creative sparks...",
    icon: <HiSparkles />,
    color: "text-amber-400",
  },
  {
    message: "Optimizing length and flow...",
    icon: <HiFilter />,
    color: "text-cyan-400",
  },
  {
    message: "Refining final formatting...",
    icon: <LuWand />,
    color: "text-indigo-400",
  },
  {
    message: "Almost ready to shine...",
    icon: <HiLightningBolt />,
    color: "text-rose-400",
  },
];

export default function TextGenerationAnimation() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const nextIndex = (prev + 1) % MESSAGES.length;
        const newStep = {
          id: Date.now(),
          message: MESSAGES[prev].message,
          icon: MESSAGES[prev].icon,
          color: MESSAGES[prev].color,
        };

        setSteps((currentSteps) => {
          // Limit to 3 items to ensure they fit in a fixed height
          const updatedSteps = [newStep, ...currentSteps].slice(0, 3);
          return updatedSteps;
        });

        return nextIndex;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full overflow-hidden rounded-2xl bg-[#0a0a0a]">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#8b5cf6,transparent_75%)] opacity-10 animate-pulse" />

      {/* Animated List Container - Increased height and removed masks */}
      <div className="relative z-10 w-full max-w-sm px-6 h-[350px]">
        <div className="flex flex-col gap-4 h-full overflow-hidden relative">
          
          <AnimatePresence mode="popLayout" initial={false}>
            {steps.map((step, i) => (
              <motion.div
                key={`${step.id}-${i}`}
                layout
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{
                  opacity: i === 0 ? 1 : i === 1 ? 0.6 : 0.2,
                  y: 0,
                  scale: 1 - i * 0.05,
                }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                }}
                className="flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-xl group relative z-10"
                style={{
                  boxShadow:
                    i === 0
                      ? "0 15px 40px -10px rgba(139, 92, 246, 0.4)"
                      : "none",
                }}
              >
                <div
                  className={`p-3 rounded-xl bg-white/5 ${step.color} text-2xl shadow-inner`}
                >
                  {step.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/20">
                    AI Thought Layer
                  </p>
                  <p className="text-base font-semibold text-white/90 leading-tight">
                    {step.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed bottom footer with solid transition */}
      <div className="mt-2 flex flex-col items-center gap-2 relative z-30 pt-4 w-full">
        <div className="flex gap-1.5 p-2 bg-[#0a0a0a]/80 backdrop-blur-md rounded-full">
          {[...Array(3)].map((_, i) => (
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
              }}
              className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]"
            />
          ))}
        </div>
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-violet-400/80 animate-pulse">
          Synthesizing Neurons
        </p>
      </div>

      <style jsx>{`
        div {
          scrollbar-width: none;
        }
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
