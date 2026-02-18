import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";

export default function InfluencersSkeleton({size}:SkeletonProps) {
  return (
    <>
        {
            Array.from({length:size}).map((_,index)=>(
                <div  key={index} className="gap-4 w-52 h-full
                 flex flex-col animate-pulse bg-slate-500" >
                    
                </div>
            ))
        }
    </>
  )
}
