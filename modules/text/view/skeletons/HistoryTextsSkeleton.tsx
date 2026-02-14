import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";


export default function HistoryTextsSkeleton({size}:SkeletonProps) {
  return (
    <div>
{
        Array.from({length:size}).map((_,index)=>(
            <div key={`i-${index}`} className="grid gap-2 grid-cols-[repeat(5,1fr)_10%] py-2 border-b border-slate-100 animate-pulse">
                <div className="flex items-center">
                    <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-5 w-20 bg-yellow-300 rounded-lg"></div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-5 w-16 bg-yellow-400 rounded-lg"></div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-5 w-12 bg-purple-300 rounded-lg"></div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-5 w-14 bg-purple-400 rounded-lg"></div>
                </div>
                <div className="flex items-center justify-center">
                    <div className="h-6 w-6 rounded-full bg-gray-300"></div>
                </div>
            </div>
        ))
    }
    </div>
  )
}
