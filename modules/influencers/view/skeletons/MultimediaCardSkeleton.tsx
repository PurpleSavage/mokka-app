import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";


export default function MultimediaCardSkeleton({size,styles}:SkeletonProps) {
  return (
    <>
        {
            Array.from({length:size}).map((_,index)=>(
                <div  key={index} className={`gap-4 w-full ${styles}
                 flex flex-col animate-pulse bg-slate-300 eosudned-lg`} >
                    
                </div>
            ))
        }
    </>
  )
}
