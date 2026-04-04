"use client";

import { RootState } from "@/store/boundStore";
import { useSelector } from "react-redux";
import MusicGeneratingAnimatedLoader from "./MusicGeneratingAnimatedLoader";

interface MusicGeneratedProps {
  prompt: string;
  genre: string;
}

export default function MusicGenerated({ prompt, genre }: MusicGeneratedProps) {
  // Accessing isGenerating state from redux
  const isGenerating = useSelector(
    (state: RootState) => state.music.isGenerating,
  );
  const hasPrompt = prompt.trim().length > 0;

  const getFontSize = () => {
    const length = prompt.length;
    if (length > 200) return "text-xl md:text-2xl";
    if (length > 100) return "text-2xl md:text-4xl";
    if (length > 50) return "text-3xl md:text-5xl";
    return "text-4xl md:text-6xl";
  };

  // If we are generating, show the specialized animated loader
  if (isGenerating?.status === "processing") {
    return (
      <div className="h-full w-full">
        <MusicGeneratingAnimatedLoader
          title="Generating your vision"
          subtitle="Sit back while the AI composes your track"
        />
      </div>
    );
  }

  // Otherwise, show the live preview design
  return (
    <section className="group relative h-full w-full overflow-hidden rounded-2xl bg-[#0a0a0a] flex flex-col shadow-2xl transition-all duration-500 hover:shadow-pink-500/10 font-sans">
      {/* Background radial glow - Pink variant to match user preference */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#f6339a,transparent_65%)] opacity-30 transition-opacity duration-700 group-hover:opacity-50" />

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-20 flex items-start justify-between p-8">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-pink-300/40">
            Live Preview
          </p>
          <div className="h-[2px] w-6 bg-pink-500/30 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/2 px-4 py-2 text-[11px] font-medium text-white/70 backdrop-blur-xl shadow-2xl transition-all hover:bg-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            {genre || "Ambient / Lo-Fi"}
          </div>
        </div>
      </div>

      {/* Main Content: Prompt */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 md:px-12 text-center select-none overflow-hidden">
        <div className="w-full max-w-4xl transform transition-transform duration-1000 group-hover:scale-[1.01]">
          <h1
            className={`font-light italic tracking-tight leading-[1.4] transition-all duration-1000
              ${getFontSize()}
              ${hasPrompt ? "text-white opacity-100 blur-0" : "text-white/10 blur-[1px]"}
              font-serif wrap-break-word`}
            style={{
              fontFamily: "'Playfair Display', 'Noto Serif', serif",
              textShadow: hasPrompt
                ? "0 0 50px rgba(246, 51, 154, 0.15)"
                : "none",
            }}
          >
            {hasPrompt ? `"${prompt}"` : "Your musical vision starts here..."}
          </h1>
        </div>
      </div>

      {/* Minimalist Visualizer - Bottom Section */}
      <div className="relative z-20 p-10 pt-0">
        <div className="flex h-16 w-full items-end justify-center gap-[4px] opacity-40 group-hover:opacity-70 transition-opacity duration-700">
          {[...Array(32)].map((_, i) => (
            <div
              key={i}
              className="w-[3px] bg-linear-to-t from-pink-600/20 to-pink-400/60 rounded-full transition-all duration-500"
              style={{
                height: hasPrompt ? `${30 + Math.random() * 70}%` : "4px",
                animation: hasPrompt
                  ? `musicWave ${1.2 + Math.random()}s ease-in-out infinite`
                  : "none",
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Local keyframes for the wave */}
      <style>{`
        @keyframes musicWave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
      `}</style>
    </section>
  );
}
