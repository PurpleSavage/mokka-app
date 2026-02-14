import { useHistoryTexts } from "../custom-hooks/useHistoryTexts"
import HistoryTextsSkeleton from "../skeletons/HistoryTextsSkeleton"
import { FaHistory } from "react-icons/fa";
import TextCard from "./TextCard"


export default function HistoryTexts() {
    const {isPending,error,textHistory}=useHistoryTexts()
    if(isPending){
        return <HistoryTextsSkeleton size={4}/>
    }
    if(error){
        return (
            <p className="text-gray-400 text-lg font-medium">{error}</p>
        )
    }
    if(textHistory.length===0){
        return (
            <p className="text-gray-400 text-lg font-medium">You don’t have any generated texts  yet</p>
        )
    }
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
        <div className="">
          {
           textHistory.map((text)=>(
                <TextCard key={text.id} text={text}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}
