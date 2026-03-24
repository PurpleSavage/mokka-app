"use client";
import { useEffect, useMemo, useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniClock } from "react-icons/hi2";
import { LuMusic2, LuWandSparkles } from "react-icons/lu";

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

const DURATION_OPTIONS = ["15s", "30s", "60s", "120s"] as const;
const LYRICS_OPTIONS = ["Auto", "Custom", "Instrumental"] as const;

//type SettingKey = "genre" | "duration" | "mode";

interface MusicTextAreaProps {
  onPreviewChange?: (payload: { prompt: string; genre: string }) => void;
}

export default function MusicTextArea({ onPreviewChange }: MusicTextAreaProps) {
  const [genre, setGenre] = useState<(typeof GENRE_OPTIONS)[number]>("Pop");
  const [customGenre, setCustomGenre] = useState("");
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState<(typeof DURATION_OPTIONS)[number]>(
    "30s",
  );
  const [lyricsMode, setLyricsMode] =
    useState<(typeof LYRICS_OPTIONS)[number]>("Auto");

  const selectedGenre = useMemo(
    () => (genre === "Other" ? customGenre : genre),
    [customGenre, genre],
  );

  useEffect(() => {
    onPreviewChange?.({
      prompt,
      genre: selectedGenre,
    });
  }, [onPreviewChange, prompt, selectedGenre]);

  return (
    <div className="p-4 border rounded-lg border-slate-600/50 bg-table-body-bg space-y-3">
      <textarea
        name="prompt-text"
        placeholder="Start typing ..."
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        className="w-full h-24 text-white rounded-lg p-3 border border-slate-600/50 bg-table-body-bg outline-none transition-all focus:border-pink-800"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center gap-1.5 text-sm hover:text-white transition-colors cursor-pointer">
              <LuWandSparkles size={15} />
              Lyrics {lyricsMode}
              <IoIosArrowDown size={12} className="text-slate-500" />
            </MenuButton>
            <MenuItems
              anchor="top start"
              transition
              className="z-50 mb-2 rounded-xl bg-table-head-bg border border-slate-700/70 p-1 min-w-36
                transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              {LYRICS_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLyricsMode(option)}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    lyricsMode === option
                      ? "bg-slate-700/70 text-white"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  {option}
                </button>
              ))}
            </MenuItems>
          </Menu>

          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center gap-1.5 text-sm hover:text-white transition-colors cursor-pointer">
              <LuMusic2 size={15} />
              {selectedGenre || "Genre"}
              <IoIosArrowDown size={12} className="text-slate-500" />
            </MenuButton>
            <MenuItems
              anchor="top start"
              transition
              className="z-50 mb-2 rounded-xl bg-table-head-bg border border-slate-700/70 p-1 min-w-40 max-h-56 overflow-y-auto custom-scrollbar
                transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              {GENRE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setGenre(option)}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    genre === option
                      ? "bg-slate-700/70 text-white"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  {option}
                </button>
              ))}

              {genre === "Other" && (
                <div className="px-1 py-1.5 space-y-1.5">
                  <input
                    type="text"
                    value={customGenre}
                    onChange={(event) => setCustomGenre(event.target.value)}
                    placeholder="Write your genre..."
                    className="w-full rounded-lg bg-table-body-bg px-2.5 py-1.5 text-xs text-default-text outline-none focus:ring-1 focus:ring-pink-800"
                  />
                </div>
              )}
            </MenuItems>
          </Menu>

          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center gap-1.5 text-sm hover:text-white transition-colors cursor-pointer">
              <HiMiniClock size={15} />
              {duration}
              <IoIosArrowDown size={12} className="text-slate-500" />
            </MenuButton>
            <MenuItems
              anchor="top start"
              transition
              className="z-50 mb-2 rounded-xl bg-table-head-bg border border-slate-700/70 p-1 min-w-28
                transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              {DURATION_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDuration(option)}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    duration === option
                      ? "bg-slate-700/70 text-white"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  {option}
                </button>
              ))}
            </MenuItems>
          </Menu>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-slate-700/65 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-600/70 transition-colors cursor-pointer"
        >
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          900 credits/min
        </button>
      </div>
    </div>
  );
}
