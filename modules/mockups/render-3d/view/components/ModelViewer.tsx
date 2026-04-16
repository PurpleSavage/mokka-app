'use client'

import { useGLTF} from "@react-three/drei"
import { RootState } from "@/store/boundStore"
import { useEffect} from "react"
import { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useSelector } from "react-redux"
import DecalOnMesh from "./DecalMesh"

interface ModelViewerProps {
  url: string
  decalUrl?: string | null
  onMeshClick?: () => void
}


const HOVER_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#7c3aed',
  transparent: true,
  opacity: 0.8,
  depthWrite: false,
})

const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
  const mesh = e.object as THREE.Mesh
  if (!mesh.userData.isEditable) return
  if (!mesh.userData.originalMaterial) {
    mesh.userData.originalMaterial = mesh.material
  }
  mesh.material = HOVER_MATERIAL
  document.body.style.cursor = 'pointer'
}

const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
  const mesh = e.object as THREE.Mesh
  if (mesh.userData.originalMaterial) {
    mesh.material = mesh.userData.originalMaterial
  }
  document.body.style.cursor = 'default'
}
const handleClick = (e: ThreeEvent<MouseEvent>, onMeshClick?: () => void) => {
  e.stopPropagation()
  const mesh = e.object as THREE.Mesh
  if (!mesh.userData.isEditable) return
  if (mesh.userData.originalMaterial) {
    mesh.material = mesh.userData.originalMaterial
  }
  document.body.style.cursor = 'default'
  onMeshClick?.()
}
export default function ModelViewer({ url, decalUrl, onMeshClick }: ModelViewerProps) {
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
    model?.nodes.filter(n => n.decalConfig).forEach((nodeConfig) => {
      const mesh = nodes[nodeConfig.nameMesh] as THREE.Mesh
      if (!mesh) return
      mesh.userData.isEditable = true
      mesh.userData.nodeConfig = nodeConfig
    })
  }, [model, nodes])

 
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