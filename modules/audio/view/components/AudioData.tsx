import { useState } from "react";
import { DateFormatter } from "@/modules/shared/common/view/utils/date-formatter.util";
import { AudioEntity } from "../../domain/entities/audio.entity";
import AudioVisualizer from "./AudioVisualizer";
import {
  downloadAudio,
  HistoryType,
} from "../utils/helpers/download-audio";
import { RiDownloadLine } from "react-icons/ri";

interface AudioDataProps {
  audio: AudioEntity;
  historyType: HistoryType;
}

export default function AudioData({ audio, historyType }: AudioDataProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadAudio = async () => {
    try {
      setIsDownloading(true);
      setError(null);
      await downloadAudio({ audio, historyType });
    } catch (downloadError) {
      console.error("Download error:", downloadError);
      setError("The audio could not be downloaded. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar pr-2">
      <div className="flex items-start justify-between gap-4">
        <div className="text-left text-xs text-slate-400 whitespace-nowrap mt-1">
          <p>{DateFormatter.formatWithDay(audio.createDate)}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold capitalize">
          {historyType}
        </span>
        <button
          type="button"
          onClick={handleDownloadAudio}
          disabled={isDownloading}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-default-text hover:text-button-hover-bg transition-colors rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label={`Download ${historyType} generated on ${DateFormatter.formatShort(audio.createDate)}`}
        >
          <RiDownloadLine size={16} />
          {isDownloading ? "Downloading..." : "Download audio"}
        </button>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="rounded-lg bg-white/5 border border-white/10 p-3">
        <AudioVisualizer url={audio.urlAudio} />
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Prompt
        </p>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap wrap-break-word">
            {audio.prompt}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Stability
          </p>
          <p className="text-sm text-slate-200 mt-1">{audio.stability}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Similarity
          </p>
          <p className="text-sm text-slate-200 mt-1">{audio.similarity}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Speed
          </p>
          <p className="text-sm text-slate-200 mt-1">{audio.speed}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Exaggeration
          </p>
          <p className="text-sm text-slate-200 mt-1">{audio.exaggeration}</p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Speaker Boost
          </p>
          <p className="text-sm text-slate-200 mt-1">
            {audio.useSpeakerBoost ? "Enabled" : "Disabled"}
          </p>
        </div>
        <div className="rounded-lg bg-white/5 border border-white/10 p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Model
          </p>
          <p className="text-sm text-slate-200 mt-1">{audio.nameModelAudio}</p>
        </div>
      </div>
    </div>
  );
}
