'use client'
import { getRangeByDay } from "@/modules/shared/common/view/utils/get-range-by-day.util"
import { useScenesLastWeek } from "../custom-hooks/useScenesLastWeek"
import MultimediaGenerationCard from "./MultimediaGenerationCard"



export default function ScenesLastWeek() {
    const {error,isPending,scenesLastWeek}=useScenesLastWeek()
    if(isPending){
        return
    }
    if(error){
        return
    }
    if(scenesLastWeek.length ===0){
        return
    }
  return (
    <section>
        <div className="">
            <h2 className="text-2xl text-white font-medium">Scenes generated last week</h2>
            <p className="text-md text-white">Scenes generated from {getRangeByDay(7)}</p>
        </div>
        <div className="flex items-center gap-4 w-full">
            {
                scenesLastWeek.map((scene)=>(
                    <MultimediaGenerationCard key={scene.id} multimedia={scene}/>
                ))
            }
        </div>
    </section>
  )
}
