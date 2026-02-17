"use client";
import { RootState } from "@/store/boundStore";
import { useState } from "react";
import { useSelector } from "react-redux";
import VoiceSamples from "./VoiceSamples";
import History from "./History";

export enum SectionOptions{
  VOICES='voices',
  HISTORY='history',
  MUSIC='music'
}
export default function AsideAudio() {
  const [section, setSection] = useState(SectionOptions.VOICES);
  const audioNotifications = useSelector(
    (state: RootState) => state.audio.audioNotifications,
  );
  return (
    <div className="flex flex-col border-l border-slate-500/60 h-full overflow-hidden bg-black">
      
      {/* CABECERA: Se queda fija arriba gracias a flex-none */}
      <div className="flex-none flex items-center gap-4 border-slate-500/60 border-b py-2 px-4">
        <button
          className={`py-1 ${section === "voices" ? "border-slate-400 text-white border-b" : "text-gray-600"}
                     cursor-pointer hover:border-slate-400`}
          onClick={() => setSection(SectionOptions.VOICES)}
        >
          Voices
        </button>
        <button
          className={`py-1 ${section === "history" ? "border-slate-400 text-white border-b" : "text-gray-600"}
                     cursor-pointer hover:border-slate-400 relative`}
          onClick={() => setSection(SectionOptions.HISTORY)}
        >
          History
          <span className="flex items-center justify-center absolute -top-1 -right-3 rounded-full bg-pink-800 text-[10px] size-4 text-white">
            {audioNotifications.length}
          </span>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden pb-20 px-4">
        <VoiceSamples section={section} />
        <History section={section} />
      </div>

    </div>
  );
}
