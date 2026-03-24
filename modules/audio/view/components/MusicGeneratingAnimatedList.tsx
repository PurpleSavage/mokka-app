"use client";

import { useEffect, useMemo, useState } from "react";

const DEFAULT_STEPS = [
  "Parsing prompt and style constraints",
  "Building rhythm section and groove",
  "Generating harmonic progression layers",
  "Synthesizing lead motifs and textures",
  "Mixing dynamics and final render",
] as const;

interface MusicGeneratingAnimatedListProps {
  title?: string;
  subtitle?: string;
  steps?: readonly string[];
  loopIntervalMs?: number;
}

export default function MusicGeneratingAnimatedList({
  title = "Generating your track",
  subtitle = "This can take a few moments",
  steps = DEFAULT_STEPS,
  loopIntervalMs = 1200,
}: MusicGeneratingAnimatedListProps) {
  const safeSteps = useMemo(
    () => (steps.length > 0 ? [...steps] : [...DEFAULT_STEPS]),
    [steps],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    const currentLine = safeSteps[activeIndex] ?? "";

    if (typedChars >= currentLine.length) {
      const nextLineTimer = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % safeSteps.length);
        setTypedChars(0);
      }, Math.max(loopIntervalMs - 300, 650));

      return () => clearTimeout(nextLineTimer);
    }

    const typingTimer = setTimeout(() => {
      setTypedChars((prev) => prev + 1);
    }, 22);

    return () => clearTimeout(typingTimer);
  }, [activeIndex, loopIntervalMs, safeSteps, typedChars]);

  const activeLine = safeSteps[activeIndex] ?? "";
  const currentTypedLine = activeLine.slice(0, typedChars);
  const drawProgress = Math.min(
    100,
    (typedChars / Math.max(activeLine.length, 1)) * 100,
  );
  const drawRatio = drawProgress / 100;

  const streamedHistory = Array.from({ length: 4 }, (_, index) => {
    const stepIndex =
      (activeIndex - (4 - index) + safeSteps.length) % safeSteps.length;
    return safeSteps[stepIndex];
  });

  const wave = useMemo(() => {
    const width = 960;
    const height = 180;
    const mid = height / 2;
    const amplitude = 26 + (activeIndex % 3) * 5;
    const phase = typedChars * 0.25;
    const totalPoints = 96;

    const computeY = (point: number) => {
      const primary = Math.sin(point * 0.42 + phase) * amplitude * 0.55;
      const secondary = Math.sin(point * 0.16 + phase * 1.4) * amplitude * 0.35;
      return mid + primary + secondary;
    };

    const points = Array.from({ length: totalPoints + 1 }, (_, index) => {
      const x = (index / totalPoints) * width;
      const y = computeY(index);
      return `${x},${y}`;
    }).join(" ");

    const cursorPoint = drawRatio * totalPoints;
    const cursorY = computeY(cursorPoint);

    return {
      width,
      height,
      points,
      cursorY,
    };
  }, [activeIndex, drawRatio, typedChars]);

  return (
    <section className="w-full rounded-lg bg-table-body-bg p-6 md:p-5 border border-slate-700/60 overflow-hidden mb-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-800">
            <span className="absolute inset-0 rounded-full bg-pink-800 animate-ping opacity-70" />
          </span>
          <div>
            <p className="text-sm text-default-text font-medium">{title}</p>
            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-table-head-bg px-2 py-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <span
              key={`dot-${index}`}
              className="h-1.5 w-1.5 rounded-full bg-pink-800 animate-pulse"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            />
          ))}
        </div>
      </div>


      <div className="mt-4 rounded-2xl bg-table-head-bg/60 p-3">
        <div className="flex items-center justify-between gap-3 pb-2">
          <p className="text-[11px] text-slate-300 tracking-wide">Generation preview</p>
          <p className="text-[10px] text-slate-500">Live waveform render</p>
        </div>

        <div className="mt-3 relative min-h-56 overflow-hidden rounded-xl bg-table-body-bg/70">
          <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-table-body-bg/90 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="text-center text-3xl md:text-4xl leading-tight font-semibold tracking-tight text-default-text/18 select-none">
              {currentTypedLine || safeSteps[activeIndex]}
              <span className="inline-block w-2 h-8 md:h-9 ml-1 align-middle bg-default-text/55 animate-pulse rounded-xs" />
            </p>
          </div>

          <div className="relative z-10 px-4 pt-3">
            <div className="flex flex-wrap gap-2 max-w-[85%]">
              {streamedHistory.slice(-2).map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  className="text-[11px] rounded-full border border-slate-700/70 bg-table-head-bg/70 px-2.5 py-1 text-slate-400"
                  style={{ opacity: 0.45 + index * 0.2 }}
                >
                  {line}
                </span>
              ))}
            </div>

            <div className="mt-20 md:mt-24">
              <div className="relative h-16 md:h-20 rounded-xl bg-table-body-bg/40 px-2 py-1 overflow-hidden">
                <svg
                  viewBox={`0 0 ${wave.width} ${wave.height}`}
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                >
                  <polyline
                    points={wave.points}
                    fill="none"
                    stroke="rgba(100, 116, 139, 0.35)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div
                  className="absolute inset-y-0 left-0 overflow-hidden transition-all duration-150"
                  style={{ width: `${drawProgress}%` }}
                >
                  <svg
                    viewBox={`0 0 ${wave.width} ${wave.height}`}
                    className="h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <polyline
                      points={wave.points}
                      fill="none"
                      stroke="rgba(157, 23, 77, 0.35)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points={wave.points}
                      fill="none"
                      stroke="rgba(157, 23, 77, 0.95)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div
                  className="absolute h-2.5 w-2.5 rounded-full bg-pink-800 shadow-[0_0_12px_rgba(157,23,77,0.55)] transition-all duration-150"
                  style={{
                    left: `calc(${drawProgress}% - 5px)`,
                    top: `${(wave.cursorY / wave.height) * 100}%`,
                    transform: "translateY(-50%)",
                  }}
                />

                <div
                  className="absolute bottom-0 left-0 h-px bg-pink-800/65 transition-all duration-150"
                  style={{ width: `${drawProgress}%` }}
                />

                <div
                  className="absolute inset-y-0 right-0 w-16 bg-linear-to-l from-table-body-bg/80 to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
