import { useHistoryTexts } from "../custom-hooks/useHistoryTexts"
import { FaHistory } from "react-icons/fa";
import TextRowRenderWrapper from "./TextRowRenderWrapper";


export default function HistoryTexts() {
    const {isPending,error,textHistory}=useHistoryTexts()
    
  return (
    <div className="mt-8 space-y-5">
      <div className="flex items-center gap-2">
        <FaHistory size={25} color="white"/>
        <p className="text-2xl font-medium text-white">Text history</p>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2 grid-cols-[repeat(5,1fr)_10%] border-b border-slate-600/50  py-2">
          <p className="text-lg text-white font-medium">Title</p>
          <p className="text-lg text-white font-medium text-center">Promotion type</p>
          <p className="text-lg text-white font-medium text-center">Tone type</p>
          <p className="text-lg text-white font-medium text-center">Length</p>
          <p className="text-lg text-white font-medium text-center">Format</p>
          <p className="text-lg text-white font-medium text-center">Ver</p>
        </div>
        <TextRowRenderWrapper isPending={isPending} error={error} textHistory={textHistory}/>
      </div>
    </div>
  )
}
