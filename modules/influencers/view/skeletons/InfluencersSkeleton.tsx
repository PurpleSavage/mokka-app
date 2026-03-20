import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";

export default function InfluencersSkeleton({size,styles="w-30 h-40"}:SkeletonProps) {
  return (
    <>
        {
            Array.from({length:size}).map((_,index)=>(
                <div  key={index} className={`
                gap-4 ${styles}
                 flex flex-col animate-pulse bg-slate-500`} >
                    
                </div>
            ))
        }
    </>
  )
}
