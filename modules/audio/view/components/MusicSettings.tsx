"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniClock } from "react-icons/hi2";
import { LuMusic2, LuWandSparkles } from "react-icons/lu";
import Spin from "@/modules/shared/common/view/components/Spin";
import {
  LYRICS_OPTIONS,
  DURATION_OPTIONS,
  GENRE_OPTIONS,
  DURATION_MAPPING,
} from "../constants/music-settings";
import { useMusicSettings } from "../custom-hooks/useMusicSettings";

interface MusicSettingsProps {
  onPreviewChange?: (payload: { prompt: string; genre: string }) => void;
}

export default function MusicSettings({ onPreviewChange }: MusicSettingsProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    errors,
    isGenerating,
    watchedGenre,
    watchedBpm,
    watchedForceInstrumental,
    watchedDurationMs,
    currentDurationLabel,
    currentLyricsLabel,
    onSubmit,
  } = useMusicSettings({ onPreviewChange });


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border rounded-lg border-slate-600/50 bg-table-body-bg space-y-4"
    >
      <div className="space-y-1">
        <textarea
          placeholder="Start typing your music description..."
          {...register("prompt")}
          className={`w-full h-24 text-white rounded-lg p-3 border bg-table-body-bg outline-none transition-all 
            ${errors.prompt ? "border-red-500" : "border-slate-600/50 focus:border-pink-800"}`}
        />
        {errors.prompt && (
          <p className="text-red-500 text-xs px-1">{errors.prompt.message}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 text-slate-300">
          {/* Lyrics Mode Menu */}
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center gap-1.5 text-sm hover:text-white transition-colors cursor-pointer">
              <LuWandSparkles size={15} />
              Lyrics: {currentLyricsLabel}
              <IoIosArrowDown size={12} className="text-slate-500" />
            </MenuButton>
            <MenuItems
              anchor="top start"
              transition
              className="z-50 mb-2 rounded-xl bg-table-head-bg border border-slate-700/70 p-1 min-w-36 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              {LYRICS_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setValue("forceInstrumental", option === "Instrumental")
                  }
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    (option === "Instrumental") === watchedForceInstrumental
                      ? "bg-slate-700/70 text-white"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  {option}
                </button>
              ))}
            </MenuItems>
          </Menu>

          {/* Genre Menu */}
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center gap-1.5 text-sm hover:text-white transition-colors cursor-pointer">
              <LuMusic2 size={15} />
              {watchedGenre || "Genre"}
              <IoIosArrowDown size={12} className="text-slate-500" />
            </MenuButton>
            <MenuItems
              anchor="top start"
              transition
              className="z-50 mb-2 rounded-xl bg-table-head-bg border border-slate-700/70 p-1 min-w-40 max-h-56 overflow-y-auto custom-scrollbar transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              {GENRE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    if (option !== "Other") setValue("genre", option);
                  }}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    watchedGenre === option
                      ? "bg-slate-700/70 text-white"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  {option}
                </button>
              ))}
              <div className="px-1 py-1.5">
                <input
                  type="text"
                  placeholder="Custom genre..."
                  onChange={(e) => setValue("genre", e.target.value)}
                  className="w-full rounded-lg bg-table-body-bg px-2.5 py-1.5 text-xs text-white outline-none focus:ring-1 focus:ring-pink-800 border border-slate-700"
                />
              </div>
            </MenuItems>
          </Menu>

          {/* Duration Menu */}
          <Menu as="div" className="relative">
            <MenuButton className="inline-flex items-center gap-1.5 text-sm hover:text-white transition-colors cursor-pointer">
              <HiMiniClock size={15} />
              {currentDurationLabel}
              <IoIosArrowDown size={12} className="text-slate-500" />
            </MenuButton>
            <MenuItems
              anchor="top start"
              transition
              className="z-50 mb-2 rounded-xl bg-table-head-bg border border-slate-700/70 p-1 min-w-28 transition duration-100 ease-out data-closed:scale-95 data-closed:opacity-0"
            >
              {DURATION_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setValue("durationMs", DURATION_MAPPING[option])
                  }
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-colors cursor-pointer ${
                    watchedDurationMs === DURATION_MAPPING[option]
                      ? "bg-slate-700/70 text-white"
                      : "text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  {option}
                </button>
              ))}
            </MenuItems>
          </Menu>

          {/* BPM Slider */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-slate-400 mr-2">
              BPM: <span className="text-white">{watchedBpm}</span>
            </label>
            <input
              type="range"
              min="40"
              max="220"
              {...register("bpm", { valueAsNumber: true })}
              className="w-48 h-1 rounded-lg bg-slate-600 accent-pink-800 cursor-pointer"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="cursor-pointer text-black font-medium bg-white hover:text-pink-800 rounded-lg py-2 px-6 min-w-44 flex items-center justify-center disabled:opacity-50"
            disabled={isGenerating?.status === "processing"}
          >
            {isGenerating?.status === "processing" ? (
              <div className="flex gap-2 items-center">
                <Spin /> Generating...
              </div>
            ) : (
              "Generate music"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
