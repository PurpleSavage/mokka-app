'use client'

import AudiosHistory from "@/modules/audio/view/components/AudiosHistory";
import VoiceSettings from "@/modules/audio/view/components/VoiceSettings";



export default function AudioGeneratorPage() {

  return (
    <div className="h-full flex flex-col">
      <VoiceSettings/>
      <AudiosHistory/>
    </div>
    
  )
}
