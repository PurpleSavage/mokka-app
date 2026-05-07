'use client'
import { Decal, useTexture } from "@react-three/drei"
import * as THREE from "three"
import { ModelNodeEntity } from "../../domain/entities/model-node.entity"
import { useRef } from "react"

export default function DecalOnMesh({ url, config, mesh, position, normal }: {
  url: string
  mesh: THREE.Mesh
  config: NonNullable<ModelNodeEntity['decalConfig']>
  position: [number, number, number]
  normal: [number, number, number]
}) {
  const texture = useTexture(url)
  const meshRef = useRef(mesh)

  return (
    <Decal
      mesh={meshRef}
      position={position}
      rotation={new THREE.Euler().setFromVector3(new THREE.Vector3(...normal))}
      scale={config.maxScale}
      map={texture}
      polygonOffsetFactor={-10}
    />
  )
}
