'use client'
import {  Decal, useTexture } from "@react-three/drei"
import { ModelNodeEntity } from "../../domain/entities/model-node.entity"

export default function DecalOnMesh({ url, config }: {
  url: string
  config: NonNullable<ModelNodeEntity['decalConfig']>
}) {
  const texture = useTexture(url)
  return (
    <Decal
      position={config.standardPosition}
      rotation={[0, 0, 0]}
      scale={config.maxScale}
      map={texture}
      polygonOffsetFactor={-10}
    />
  )
}
