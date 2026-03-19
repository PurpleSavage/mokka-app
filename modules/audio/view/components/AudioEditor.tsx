"use client";

import { useState } from "react";
import AudioVisualizer from "./AudioVisualizer";
import { RiDownloadLine } from "react-icons/ri";
import { exportEditedAudioAsWav } from "../utils/helpers/export-edited-audio";

const mockEditorAudioUrl =
  "https://qtfzgnmvgaggnshpukmo.supabase.co/storage/v1/object/public/mokkaaudios/voice-models/voice_preview_callum.mp3";

export default function AudioEditor() {
  const [startCut, setStartCut] = useState(0);
  const [endCut, setEndCut] = useState(90);
  const [fadeIn, setFadeIn] = useState(10);
  const [fadeOut, setFadeOut] = useState(10);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const safeStartCut = Math.min(startCut, endCut - 1);
  const safeEndCut = Math.max(endCut, startCut + 1);

  const handleExportEditedAudio = async () => {
    try {
      setIsExporting(true);
      setExportError(null);

      await exportEditedAudioAsWav({
        url: mockEditorAudioUrl,
        startPercent: safeStartCut,
        endPercent: safeEndCut,
        fadeInPercent: fadeIn,
        fadeOutPercent: fadeOut,
      });
    } catch (error) {
      console.error("Export error:", error);
      setExportError(
        "No se pudo exportar el audio. Revisa CORS del archivo o intenta con otro audio.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 h-full">
      <div className="rounded-xl border border-slate-700/60 bg-table-bg p-4 space-y-4">
        <div className="space-y-1">
          <h2 className="text-white text-lg font-semibold">Audio preview</h2>
        </div>

        <div className="rounded-lg border border-slate-600/60 bg-table-body-bg p-3">
          <AudioVisualizer
            url={mockEditorAudioUrl}
            height={84}
            showControls={true}
            showSkeleton={true}
            exclusiveGroup="audio-editor"
            playbackStartPercent={safeStartCut}
            playbackEndPercent={safeEndCut}
            fadeInPercent={fadeIn}
            fadeOutPercent={fadeOut}
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-700/60 bg-table-bg p-4 space-y-4">
        <h3 className="text-white text-lg font-semibold">Editor settings</h3>

        <div className="space-y-3">
          <label className="text-sm text-slate-300 block">
            Start cut: {startCut}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={startCut}
            onChange={(event) => setStartCut(Number(event.target.value))}
            className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer"
          />

          <label className="text-sm text-slate-300 block">
            End cut: {endCut}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={endCut}
            onChange={(event) => setEndCut(Number(event.target.value))}
            className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer"
          />

          <label className="text-sm text-slate-300 block">
            Fade in: {fadeIn}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={fadeIn}
            onChange={(event) => setFadeIn(Number(event.target.value))}
            className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer"
          />

          <label className="text-sm text-slate-300 block">
            Fade out: {fadeOut}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={fadeOut}
            onChange={(event) => setFadeOut(Number(event.target.value))}
            className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer"
          />
        </div>

        <button
          type="button"
          onClick={handleExportEditedAudio}
          disabled={isExporting}
          className="w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-slate-600/70 px-4 py-2 text-sm font-medium text-default-text hover:text-button-hover-bg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <RiDownloadLine size={16} />
          {isExporting ? "Exporting..." : "Export edited audio"}
        </button>

        {exportError && <p className="text-xs text-red-400">{exportError}</p>}
      </div>
    </section>
  );
}
