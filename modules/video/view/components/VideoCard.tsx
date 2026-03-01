'use client'
import { VideoEntity } from "@/modules/video/domain/entities/video.entity"
import { useRef } from "react"

interface VideoCardProps {
  video: VideoEntity
}
export default function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div
      className="w-full h-60 rounded-xl overflow-hidden"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause()
        if (videoRef.current) videoRef.current.currentTime = 0
      }}
    >
      <video
        ref={videoRef}
        src={video.videoUrl}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  )
}