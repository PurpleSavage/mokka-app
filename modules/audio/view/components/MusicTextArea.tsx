"use client";
import { useEffect, useMemo, useState } from "react";
import { PiTimer } from "react-icons/pi";
import { RiVoiceAiLine } from "react-icons/ri";
import DropDown from "@/modules/shared/common/view/components/DropDown";

const GENRE_OPTIONS = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "Electronic",
  "Ambient",
  "Lo-fi",
  "Cinematic",
  "Reggaeton",
  "Other",
] as const;

interface MusicTextAreaProps {
  onPreviewChange?: (payload: { prompt: string; genre: string }) => void;
}

export default function MusicTextArea({ onPreviewChange }: MusicTextAreaProps) {
  const [genre, setGenre] = useState<(typeof GENRE_OPTIONS)[number]>("Pop");
  const [customGenre, setCustomGenre] = useState("");
  const [prompt, setPrompt] = useState("");

  const selectedGenre = useMemo(
    () => (genre === "Other" ? customGenre : genre),
    [customGenre, genre],
  );

  const genreOptions = GENRE_OPTIONS.map((option) => ({
    id: option.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: option,
  }));

  useEffect(() => {
    onPreviewChange?.({
      prompt,
      genre: selectedGenre,
    });
  }, [onPreviewChange, prompt, selectedGenre]);

  return (
    <div className="p-4 border rounded-lg border-slate-600/50 bg-table-body-bg space-y-3">
      <div className="space-y-1">
        <label className="text-white text-xs block">Genre</label>
        {genre === "Other" ? (
          <input
            type="text"
            value={customGenre}
            onChange={(event) => setCustomGenre(event.target.value)}
            placeholder="Write your genre..."
            className="w-full rounded-lg border border-slate-600/50 bg-table-bg px-3 py-2 text-default-text outline-none focus:border-pink-800"
          />
        ) : (
          <DropDown
            options={genreOptions}
            selected={genre}
            placeholder="Select a genre"
            handleSelect={(option) =>
              setGenre(option.name as (typeof GENRE_OPTIONS)[number])
            }
          />
        )}
      </div>

      {genre === "Other" && (
        <button
          type="button"
          onClick={() => {
            setGenre("Pop");
            setCustomGenre("");
          }}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Back to default genres
        </button>
      )}

      <textarea
        name="prompt-text"
        placeholder="Start typing ..."
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        className="w-full h-32 text-white rounded-lg p-3 border border-slate-600/50 bg-table-body-bg outline-none transition-all focus:border-pink-800"
      />

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-400">
          Selected genre: {selectedGenre || "-"}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-white cursor-pointer hover:text-slate-400"
          >
            <RiVoiceAiLine size={18} />
          </button>
          <button
            type="button"
            className="text-white cursor-pointer hover:text-slate-400"
          >
            <PiTimer size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
