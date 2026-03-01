'use client'

import MultimediaCardSkeleton from "@/modules/shared/common/view/skeletons/MultimediaCardSkeleton"
import { useHistoryVideos } from "../custom-hooks/useHistoryVideos"
import VideoCard from "./VideoCard"

export default function ListHistoryVideos() {
    const { historyVideos, isPending, error } = useHistoryVideos()
    if(isPending){
        return (<MultimediaCardSkeleton size={8} styles="h-80"/>)
    }
    if(error){
      return (
        <div className="flex justify-center items-center col-span-4">
          <p className="text-red-500">{error}</p>
        </div>
      )
    }
    if(historyVideos.length===0){
      return(
        <div className="flex justify-center items-center p-1 col-span-4">
           <p className="text-slate-400">No videos were generated </p>
        </div>
      )
    }
  return (
    <>
        {historyVideos.map((video) => (
            <div key={video.id} className="col-span-1">
                <VideoCard video={video} />
            </div>
        ))}
    </>
  )
}
