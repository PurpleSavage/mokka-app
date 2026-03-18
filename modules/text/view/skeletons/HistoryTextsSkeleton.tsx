import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";

interface HistoryTextsSkeletonProps extends SkeletonProps {
  
    cols: string
}

export default function HistoryTextsSkeleton({size,cols}:HistoryTextsSkeletonProps) {
  return (
        <div className="bg-table-bg/60 divide-y divide-table-bg/40">
            {Array.from({ length: size }).map((_, index) => (
                <div key={`skeleton-${index}`} className={`grid ${cols} gap-4 px-4 py-3 animate-pulse`}>
                    <div className="h-4 bg-slate-700 rounded-lg" />
                    <div className="h-4 bg-slate-700 rounded-lg" />
                    <div className="h-4 bg-slate-700 rounded-lg justify-self-center w-3/4" />
                    <div className="h-4 bg-slate-700 rounded-lg justify-self-center w-3/4" />
                    <div className="h-4 bg-slate-700 rounded-lg justify-self-center w-3/4" />
                    <div className="h-4 bg-slate-700 rounded-lg justify-self-center w-3/4" />
                    <div className="h-4 bg-slate-700 rounded-lg justify-self-center w-1/2" />
                    <div className="h-4 w-4 bg-slate-700 rounded-lg justify-self-center" />
                </div>
            ))}
        </div>
    )
}
