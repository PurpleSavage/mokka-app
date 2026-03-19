"use client";
import { useMemo, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { audioModels } from "../constants/audio-samples";
import AudioVisualizer from "./AudioVisualizer";

export default function VoiceSamples() {
  const [searchName, setSearchName] = useState("");

  const filteredAudioModels = useMemo(
    () =>
      audioModels.filter((audio) =>
        audio.name.toLowerCase().includes(searchName.toLowerCase()),
      ),
    [searchName],
  );

  return (
    <div className="text-white h-full mt-1">
      <div className="mb-3">
        <div className="relative">
          <FaMagnifyingGlass
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
            placeholder="Search by voice by name..."
            className="w-full rounded-lg border border-slate-600/50 bg-table-bg pl-9 pr-3 py-2 text-default-text outline-none focus:border-pink-800"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-table-head-bg">
              <th className="px-4 py-2 text-left">Voice</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Language</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-center">Voice record</th>
            </tr>
          </thead>
          <tbody>
            {filteredAudioModels.map((audio) => (
              <tr
                key={audio.idSample}
                className="bg-table-body-bg hover:bg-table-body-hover-bg rounded-lg"
              >
                <td className="px-4 py-2 text-left">
                  <div className="size-10 rounded-full overflow-hidden">
                    <img
                      src={audio.urlImage}
                      className="object-cover w-full h-full rounded-full"
                      alt="model sample voice"
                    />
                  </div>
                </td>
                <td className="px-4 py-2 font-semibold text-left">
                  {audio.name}
                </td>
                <td className="px-4 py-2 text-left">
                  <span
                    className={`px-4 rounded-full ${audio.gender === "female" ? "text-female-text bg-female-bg" : "text-male-text bg-male-bg"}`}
                  >
                    {audio.gender.charAt(0).toUpperCase() +
                      audio.gender.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 text-left">English</td>
                <td className="px-4 py-2 text-left">Characters</td>
                <td className="px-4 py-2 text-right">
                  <AudioVisualizer
                    url={audio.urlAudioSample}
                    height={20}
                    waveColor="#9D174D"
                    progressColor="#9D174D"
                    showControls={true}
                    showSkeleton={true}
                    exclusiveGroup="voice-samples"
                  />
                </td>
              </tr>
            ))}
            {filteredAudioModels.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-4 text-center text-slate-400"
                >
                  No entries with that name were found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
