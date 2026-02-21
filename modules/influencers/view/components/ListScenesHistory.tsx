'use client'

import { useScenesHistory } from "../custom-hooks/useScenesHistory"
import MultimediaCardSkeleton from "../skeletons/MultimediaCardSkeleton"
import MultimediaGenerationCard from "./MultimediaGenerationCard"

export default function ListScenesHistory() {
    const {error,isPending,scenesHistory}=useScenesHistory()
    if(isPending){
      return (<MultimediaCardSkeleton size={8}/>)
    }
    if(error){
      return (
        <div className="flex justify-center items-center col-span-4">
          <p className="text-red-500">{error}</p>
        </div>
      )
    }
    if(scenesHistory.length===0){
      return(
        <div className="flex justify-center items-center p-1 col-span-4">
           <p className="text-slate-400">No scenes were generated </p>
        </div>
      )
    }
  return (
    <>
      
      {scenesHistory.map((scene) => (
          <div key={scene.id} className="break-inside-avoid mb-4">
            <MultimediaGenerationCard multimedia={scene} />
          </div>
        ))}
    </>
  )
}
