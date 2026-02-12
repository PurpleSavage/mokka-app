'use client'

import { RootState } from "@/store/boundStore"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { audioDi } from "../../di/audio-container.di"
import { setAudioHistory } from "../../audio-slice/audio-store.slice"
import HistoryAudiosSkeleton from "../skeletons/HistoryAudiosSkeleton"
import AudioCard from "./AudioCard"

interface HistoryProps{
  section:string
}
export default function History({ section }: HistoryProps) {
  const [error,setError] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const [idSample,setIdSample]=useState('')
  const [isPending , setIsPending] = useState(true)

  const audioHistory = useSelector((state:RootState)=>state.audio.audioHistory)
  const session = useSelector((state:RootState)=>state.auth.session)

  const dispatch = useDispatch()
  useEffect(()=>{
    if(!session) return

    if (audioHistory.length > 0) {
      setIsPending(false)
      return
    }
    const getHistory=async()=>{
      try {
        const audios = await audioDi.listAudioHistory(session.user.id) 
        dispatch(setAudioHistory(audios))
      } catch (error) {
        console.log(error)
        setError('ups, ocurrión un error al cargar los datos')
      }finally{
        setIsPending(false)
      }
    }
    getHistory()
  },[session,dispatch,audioHistory.length])


  const handleAudioSamplePlay =(id:string)=>{
    const selectedAudio = audioHistory.find((element)=>element.id === id)
    if (idSample !== id) {
      setIdSample(id)
      if (audioRef.current && selectedAudio) {
        audioRef.current.src = selectedAudio?.urlAudio
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
      className={`transform transition-transform duration-500 mt-2 ease-out
        ${section === "history" ? " block" : "hidden"} 
        text-black`}
    >
      <audio ref={audioRef} className="hidden" onEnded={()=>setIdSample("")}/>
      {
        isPending ? 
        <HistoryAudiosSkeleton size={5}/>
        :
        error ? 
        <p className="text-gray-400 text-md">{error}</p>
        :
        audioHistory.length === 0 ? 
        <p className="text-gray-400 text-lg font-medium">You don’t have any generated audio history yet</p>
        :
        audioHistory.map((audio)=>(
          <AudioCard key={audio.id} 
          audio={audio} 
          handleAudioSamplePlay={handleAudioSamplePlay} idSample={idSample}/>
        ))
      }
    </div>
  );
}
