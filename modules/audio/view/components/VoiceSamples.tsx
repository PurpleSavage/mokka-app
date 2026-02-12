
'use client'
import { useRef, useState } from "react"
import { FaPlay,FaPause } from "react-icons/fa6";
import { audioModels } from "../constants/audio-samples";


interface VoiceSamplesProps{
  section:string
}
export default function VoiceSamples({ section }: VoiceSamplesProps) {
  const [idSample,setIdSample]=useState('')
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleAudioSamplePlay =(id:string)=>{
    const selectedAudio = audioModels.find((element)=>element.idSample === id)
    if (idSample !== id) {
      setIdSample(id)
      if (audioRef.current && selectedAudio) {
        audioRef.current.src = selectedAudio?.urlAudioSample
        audioRef.current.play()
      }
    } else {
      setIdSample('')
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }

  return (
    <div
       className={`
        ${section === "voices" ? "block" : "hidden"} 
      text-white h-full mt-1`}
    >
      <audio className="hidden" ref={audioRef} onEnded={()=>setIdSample("")}/>
      {audioModels.map((audio) => (
        <div key={audio.idSample} className="flex items-center gap-2 py-3 cursor-pointer px-2 rounded-lg
         hover:bg-[#1c1c1c]">
          <div className="flex gap-2 items-center">
            <div className="size-10 rounded-full overflow-hidden">
              <img
                src={audio.urlImage}
                className="object-cover w-full h-full rounded-full"
                alt="model sample voice"
              />
            </div>
            <p>{audio.name}</p>
          </div>
          <div className="grow flex justify-end gap-2">
            <div className={`px-4 rounded-full
               ${audio.gender==='female'? "text-pink-800 bg-pink-100": "text-sky-800 bg-sky-100"}`}>
              # {audio.gender}
            </div>
            <button 
              onClick={()=> handleAudioSamplePlay (audio.idSample)} 
              className={`cursor-pointer outline-none`} type="button"
            >{idSample === audio.idSample? <FaPause size={18}/> : <FaPlay size={18}/>}</button>
          </div>
        </div>
      ))}
    </div>
  );
}
