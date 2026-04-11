import { SkeletonProps } from "@/modules/shared/common/view/props/skeleton-props";


export default function BackgroundSkeletonList({size}:SkeletonProps) {
  return (
    <>
      {Array.from({ length: size }).map((_, index) => (
        <div
          key={index}
          className="w-full h-16 rounded-md bg-slate-700/50 animate-pulse"
        />
      ))}
    </>
  )
}
