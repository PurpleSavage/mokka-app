"use client";
import { PiTimer } from "react-icons/pi";
import { RiVoiceAiLine } from "react-icons/ri";
export default function MusicTextArea() {
  return (
    <div className="p-4 border  rounded-lg border-slate-300">
      <textarea
        name="prompt-text"
        placeholder="Start typing ..."
        className="w-full h-32 text-white  outline-none "
      />
      <div className="flex items-center gap-3 justify-end">
        <button
          type="button"
          className="text-white  cursor-pointer hover:text-slate-400"
        >
          <RiVoiceAiLine size={18} />
        </button>
        <button
          type="button"
          className="text-white  cursor-pointer hover:text-slate-400"
        >
          <PiTimer size={18} />
        </button>
      </div>
    </div>
  );
}
