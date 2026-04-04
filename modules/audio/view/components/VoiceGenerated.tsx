"use client";
interface VoiceGeneratedProps {
  prompt: string;
}

export default function VoiceGenerated({ prompt }: VoiceGeneratedProps) {
  const hasPrompt = prompt.trim().length > 0;

  const getFontSize = () => {
    const length = prompt.length;
    if (length > 200) return "text-xl md:text-2xl";
    if (length > 100) return "text-2xl md:text-3xl";
    if (length > 50) return "text-3xl md:text-4xl";
    return "text-4xl md:text-5xl";
  };

  // The loader is now handled in the VoiceSettings area (over the textarea)
  // as per user request. This component now focus on the script preview.

  return (
    <section className="group relative h-full w-full overflow-hidden rounded-2xl bg-[#0a0a0a] flex flex-col shadow-2xl transition-all duration-500 hover:shadow-violet-500/10 font-sans border border-white/5">
      {/* Background radial glow - Violet variant for Audio */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#8b5cf6,transparent_65%)] opacity-20 transition-opacity duration-700 group-hover:opacity-40" />

      {/* Header Info */}
      <div className="relative z-20 flex items-start justify-between p-8">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-violet-300/40">
            Voice Synthesis Preview
          </p>
          <div className="h-[2px] w-6 bg-violet-500/30 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/2 px-4 py-2 text-[11px] font-medium text-white/70 backdrop-blur-xl shadow-2xl transition-all hover:bg-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Neural Voice Engine
          </div>
        </div>
      </div>

      {/* Main Content: Script/Prompt */}
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
                ? "0 0 50px rgba(139, 92, 246, 0.15)"
                : "none",
            }}
          >
            {hasPrompt ? `"${prompt}"` : "Enter your script to start..."}
          </h1>
        </div>
      </div>

      {/* Visualizer - Voice Pattern */}
      <div className="relative z-20 p-10 pt-0">
        <div className="flex h-12 w-full items-center justify-center gap-[6px] opacity-30 group-hover:opacity-60 transition-opacity duration-700">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="w-[2px] bg-linear-to-t from-violet-600/20 to-violet-400/60 rounded-full transition-all duration-500"
              style={{
                height: hasPrompt ? `${20 + Math.random() * 80}%` : "3px",
                animation: hasPrompt
                  ? `voiceWave ${1 + Math.random()}s ease-in-out infinite`
                  : "none",
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes voiceWave {
          0%, 100% { height: 20%; opacity: 0.5; }
          50% { height: 80%; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
