'use client'

import { use } from "react"
import { useSnapshotsByInfluencer } from "../custom-hooks/useSnapshotsByInfluencer"
import MasonrySkeleton from "@/modules/shared/common/view/skeletons/MasonrySkeleton"

interface SnapshotsGalleryByInfluencerProps{
  params: Promise<{ id: string }>
}
export default function SnapshotsGalleryByInfluencer({params}:SnapshotsGalleryByInfluencerProps) {
    const { id } = use(params)
    const {error,isPending,snapshotsHistoryByInfluencer} = useSnapshotsByInfluencer(id)
    if(isPending){
      return <MasonrySkeleton/>
    }
    if(error){
      return(
        <div className="-full p-5 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      )
    }
    return (
      <div className="columns-2 md:columns-3 lg:columns-4 gap-1 ">
        {
          snapshotsHistoryByInfluencer.map((snapshot,index)=>(
            <div key={snapshot.id} className="break-inside-avoid mb-1">
              <img
                src={snapshot.snapshotUrl}
                alt='Snpashot of influencer generated with IA'
                className="w-full"
                style={{ aspectRatio: index % 3 === 0 ? '1/1.5' : index % 2 === 0 ? '1/0.8' : '1/1' }}
              />
            </div>
          ))
        }
      </div>
    )
}
