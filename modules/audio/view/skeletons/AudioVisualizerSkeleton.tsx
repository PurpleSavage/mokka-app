interface AudioVisualizerSkeletonProps {
  height?: number
  className?: string
}

const WAVE_BARS = [
  20, 32, 58, 42, 76, 30, 50, 68, 46, 26, 62, 82, 56, 34,
  22, 48, 72, 40, 60, 88, 52, 28, 66, 44, 74, 38, 54, 24
]

export default function AudioVisualizerSkeleton({
  height = 60,
  className = ''
}: AudioVisualizerSkeletonProps) {
  const trackHeight = Math.max(height, 28)

  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-lg ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-[#2d2d2d]" />
      <div className="relative flex h-full items-center justify-center gap-1 px-2">
        {WAVE_BARS.map((barHeight, index) => (
          <span
            key={`${barHeight}-${index}`}
            className="w-[0.1px] rounded-full bg-button-bg opacity-95 animate-pulse"
            style={{
              height: `${Math.max(4, Math.round((barHeight / 100) * trackHeight))}px`,              
            }}
          />
        ))}
      </div>
    </div>
  )
}
