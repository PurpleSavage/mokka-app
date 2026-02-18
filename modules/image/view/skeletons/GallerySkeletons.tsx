import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";


export default function GallerySkeletons({size}:SkeletonProps) {
  return (
    <>
        {
            Array.from({length:size}).map((_,index)=>(
                <div  key={index} className="gap-4 rounded-lg flex flex-col animate-pulse" >
                    <div className="grow w-full overflow-hidden h-75 rounded-2xl bg-gray-200" />
                    
                    <div className="space-y-2 w-full">
                        <div className="flex items-center">
                        <div className="grow h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-4 bg-gray-200 rounded w-16 ml-4" />
                        </div>

                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            ))
        }
    </>
  )
}
