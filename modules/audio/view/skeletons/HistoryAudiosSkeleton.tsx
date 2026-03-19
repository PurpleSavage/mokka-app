import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";

const HEADERS = ["Date", "Type", "Model", "Prompt", "Audio", "Actions"];

export default function HistoryAudiosSkeleton({ size }: SkeletonProps) {
  return (
        <div className="space-y-2">
            <div className="grid gap-2 grid-cols-[repeat(5,1fr)_10%] bg-table-head-bg rounded-md px-2 py-2">
                {HEADERS.map((header) => (
                    <p
                        key={header}
                        className="text-xs uppercase tracking-wide text-slate-400 text-center"
                    >
                        {header}
                    </p>
                ))}
            </div>

            {Array.from({ length: size }).map((_, index) => (
                <div
                    key={index}
                    className="grid gap-2 grid-cols-[repeat(5,1fr)_10%] py-2 px-2 border-b border-slate-700/40 animate-pulse"
                >
                    <div className="flex items-center">
                        <div className="h-5 w-3/4 rounded bg-slate-600/40" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-5 w-20 rounded-lg bg-slate-600/40" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-5 w-16 rounded-lg bg-slate-600/40" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-5 w-28 rounded-lg bg-slate-600/40" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-8 w-24 rounded-lg bg-slate-600/40" />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full bg-slate-600/40" />
                    </div>
                </div>
            ))}
        </div>
    );
}
