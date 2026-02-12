'use client'
import { AudioEntity } from "../../domain/entities/audio.entity";
import { FaPlay, FaPause } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch } from "react-redux";
import { lookAudioData } from "../../audio-slice/audio-store.slice";
import { selectAvatar } from "../utils/helpers/select-avatar.helper";


export interface AudioCardProps {
  audio: AudioEntity;
  handleAudioSamplePlay: (id: string) => void;
  idSample: string;
}
export default function AudioCard({ audio, handleAudioSamplePlay, idSample }: AudioCardProps) {
  const dispatch = useDispatch()
  const onClickOpenTextDataModal =()=>{
    document.body.style.overflow = "hidden"
    dispatch(lookAudioData(audio))
    dispatch(animateModal({
      isOpen:true
    }))
  }
  return (
    <div
      key={audio.id}
      className="flex gap-2 items-center py-3 cursor-pointer px-2 rounded-lg
             hover:bg-[#1c1c1c]"
    >
        <div className="flex items-center gap-1">
            <img
            src={selectAvatar(audio.idModel)}
            alt="image orbe model"
            className="size-7.5 rounded-full"
            />
            <div className="px-2">
            <button
                onClick={() => handleAudioSamplePlay(audio.id)}
                className={`cursor-pointer outline-none`}
                type="button"
            >
                {idSample === audio.id ? (
                <FaPause size={18} color="white"/>
                ) : (
                <FaPlay size={18} color="white"/>
                )}
            </button>
            </div>
        </div>
        <div className="grow flex justify-end items-center gap-2">
            <p
            className="w-25 text-white px-2 border-r
                    border-slate-600/50 overflow-hidden whitespace-nowrap text-ellipsis truncate"
            >
            {audio.prompt}
            </p>
            <p className="text-white px-2 border-r border-slate-600/50 text-sm">
            {audio.createDate}
            </p>
            <p className="rounded-full px-4 bg-amber-100 text-amber-800">
            {audio.nameModelAudio}
            </p>
        </div>
        <button 
          type="button" className="p-2 cursor-pointer text-white hover:text-gray-600"
          onClick={onClickOpenTextDataModal}
        ><MdOutlineRemoveRedEye size={18} /></button>
    </div>
  );
}
