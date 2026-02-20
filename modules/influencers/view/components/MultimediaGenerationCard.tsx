'use client'

import { InfluencerSceneEntity } from "../../domain/entities/influencer-scene.entity"
import { InfluencerSnapshotEntity } from "../../domain/entities/influencer-snapshot.entity"

interface MultimediaGenerationCardProps {
  multimedia: InfluencerSceneEntity | InfluencerSnapshotEntity
}

export default function MultimediaGenerationCard({ multimedia }: MultimediaGenerationCardProps) {

  const isVideo = 'urlScene' in multimedia;
  const src = isVideo ? multimedia.urlScene : (multimedia as InfluencerSnapshotEntity).snapshotUrl;

  return (
    <div className="w-60 h-72 overflow-hidden rounded-lg bg-gray-100">
      {isVideo ? (
        <video 
          src={src} 
          controls 
          className="w-full h-full object-cover"
        />
      ) : (
        <img 
          src={src} 
          alt="Generated multimedia" 
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}