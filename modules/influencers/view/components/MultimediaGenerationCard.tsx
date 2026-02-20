'use client'

import { InfluencerSceneEntity } from "../../domain/entities/influencer-scene.entity"
import { InfluencerSnapshotEntity } from "../../domain/entities/influencer-snapshot.entity"

interface MultimediaGenerationCardProps{
    multimedia:InfluencerSceneEntity | InfluencerSnapshotEntity
}
export default function MultimediaGenerationCard({multimedia}:MultimediaGenerationCardProps) {
  return (
    <div>MultimediaGenerationCard</div>
  )
}
