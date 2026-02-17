import MusicGenerated from "@/modules/audio/view/components/MusicGenerated";
import MusicTextArea from "@/modules/audio/view/components/MusicTextArea";
export default function MusicPage() {
  return (
    <div className="h-full flex flex-col gap-2">
      <div className="grow flex items-center justify-center
       bg-radial-[at_25%_25%] rounded-lg from-black to-pink-900 to-75%">
        <MusicGenerated/>
      </div>
      <MusicTextArea/>
    </div>
  )
}
