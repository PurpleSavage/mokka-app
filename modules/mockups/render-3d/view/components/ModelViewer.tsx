'use client'

import { useGLTF} from "@react-three/drei"
import { RootState } from "@/store/boundStore"
import { useEffect} from "react"
import { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useSelector } from "react-redux"
import DecalOnMesh from "./DecalMesh"
import { handlePointerOver } from "../utils/handlers/handle-pointer-over.handler"
import { handleClick } from "../utils/handlers/handle-click.handler"
import { handlePointerOut } from "../utils/handlers/handle-pointer-out.handler"

interface ModelViewerProps {
  url: string
  decalUrl?: string | null
  onMeshClick?: () => void
  roughness:number
  metalness:number
}

export default function ModelViewer({ url, decalUrl, onMeshClick,roughness,metalness }: ModelViewerProps) {
  const { nodes,scene } = useGLTF(url)
  const model = useSelector((state: RootState) => state.render3D.modelLoadedInRender)
  console.log(model?.name)

  Object.entries(nodes).forEach(([name, node]) => {
    const mesh = node as THREE.Mesh
    console.log(name, '→ tiene geometry:', !!mesh.geometry)
    console.log(name, {
      position: mesh.position.toArray(),
      rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z],
      scale: mesh.scale.toArray()
    })
  })

  useEffect(() => {
    if (!model) return
    // primero marcar editables
    model.nodes.filter(n => n.decalConfig).forEach((nodeConfig) => {
      const mesh = nodes[nodeConfig.nameMesh] as THREE.Mesh
      if (!mesh) return
      mesh.userData.isEditable = true
      mesh.userData.nodeConfig = nodeConfig
    })
  }, [model, nodes])

  useEffect(() => {
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh
      if (mesh.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial
        mat.roughness = roughness
        mat.metalness = metalness
        mat.needsUpdate = true
        // actualizar también el originalMaterial guardado
        if (mesh.userData.originalMaterial) {
          mesh.userData.originalMaterial.roughness = roughness
          mesh.userData.originalMaterial.metalness = metalness
        }
      }
    }
  })
}, [roughness, metalness, scene])

 
  return (
    <group>
    <primitive
      object={scene}
        castShadow
        receiveShadow
        onClick={(e: ThreeEvent<MouseEvent>) => handleClick(e, onMeshClick)}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
    />

    {/* Decals encima de los meshes editables */}
    {decalUrl && model?.nodes.filter(n => n.decalConfig).map((nodeConfig) => {
      const mesh = nodes[nodeConfig.nameMesh] as THREE.Mesh
      if (!mesh || !mesh.geometry) return null

      return (
        <primitive key={nodeConfig.id} object={mesh}>
          <DecalOnMesh url={decalUrl} config={nodeConfig.decalConfig!} />
        </primitive>
      )
    })}
  </group>
  )
}