import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";


export default function MultimediaCardSkeleton({size}:SkeletonProps) {
  return (
    <>
        {
            Array.from({length:size}).map((_,index)=>(
                <div  key={index} className="gap-4 w-full h-80
                 flex flex-col animate-pulse bg-slate-300 eoudned-lg" >
                    
                </div>
            ))
        }
    </>
  )
}
