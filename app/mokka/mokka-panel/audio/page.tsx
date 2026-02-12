import History from "@/modules/audio/view/components/History";
import VoiceSamples from "@/modules/audio/view/components/VoiceSamples";
import VoiceSettings from "@/modules/audio/view/components/VoiceSettings";
import { RootState } from "@/store/boundStore";
import { useState } from "react";
import { useSelector } from "react-redux";


export default function AudioGeneratorPage() {
     const [section,setSection]=useState('voices')
     const audioNotifications = useSelector((state:RootState)=>state.audio.audioNotifications)
  return (
    <div className="grid  grid-cols-2 gap-2 grow">
        <VoiceSettings/>
        <div className="px-2  flex flex-col  overflow-y-auto ">
          <div className="flex items-center gap-4 border-slate-600/50 border-b py-2">
            <button 
              className={`py-1 ${section==='voices' ? "border-slate-400 text-white border-b":"text-gray-600"}
               cursor-pointer hover:border-slate-400`} 
              onClick={()=>setSection('voices')}
            >Voices</button>
            <button 
              className={` py-1 ${section==='history' ? "border-slate-400 text-white border-b":" text-gray-600"}
               cursor-pointer hover:border-slate-400 relative`} 
              onClick={()=>setSection('history')}
            >
              History
              <span className="block absolute -top-1 -right-2 rounded-full bg-pink-800 text-xs size-4
               text-white">{audioNotifications.length}</span>
            </button>
          </div>
          <div className="overflow-x-hidden sticky top-0 bottom-0 left-0 ">
            <VoiceSamples section={section}/>
            <History section={section}/>
          </div>
        </div>
    </div>
  )
}
