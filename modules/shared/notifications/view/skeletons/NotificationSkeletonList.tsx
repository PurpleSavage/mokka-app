import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";

export default function NotificationSkeletonList({ size }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: size }).map((_, i) => (
        <div
          key={`notification-${i}`}
          className="relative flex flex-col gap-2 p-4 rounded-xl bg-table-body-bg border border-slate-600/30 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-700/50 shrink-0" />
            <div className="h-3.5 bg-slate-700/50 rounded w-2/5 grow" />
            <div className="h-3 bg-slate-700/50 rounded w-16 shrink-0" />
          </div>

          <div className="pl-11 space-y-1.5">
            <div className="h-2.5 bg-slate-700/50 rounded w-full" />
            <div className="h-2.5 bg-slate-700/50 rounded w-3/4" />
          </div>

          <div className="flex items-center gap-2 pl-11">
            <div className="h-5 bg-slate-700/50 rounded-md w-16" />
            <div className="h-5 bg-slate-700/50 rounded-md w-20" />
          </div>
        </div>
      ))}
    </>
  );
}
