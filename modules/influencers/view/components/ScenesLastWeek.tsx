'use client'

import { useScenesLastWeek } from "../custom-hooks/useScenesLastWeek"
import MultimediaGenerationCard from "./MultimediaGenerationCard"
import MultimediaCardSkeleton from "../skeletons/MultimediaCardSkeleton"

export default function ScenesLastWeek() {
    const {error,isPending,scenesLastWeek}=useScenesLastWeek()
    if(isPending){
        return <MultimediaCardSkeleton size={4}/>
    }
    if(error){
        return(
            <div className="flex items-center justify-center p-2">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }
    if(scenesLastWeek.length ===0){
        return (
            <div className="flex items-center justify-center p-2">
                <p className="text-slate-400">No scenes were generated last week</p>
            </div>
        )
    }
  return (
    <div className="flex items-center gap-4 w-full overflow-y-auto">
            {
                scenesLastWeek.map((scene)=>(
                    <MultimediaGenerationCard key={scene.id} multimedia={scene}/>
                ))
            }
        </div>
  )
}
