'use client'

import { useGLTF} from "@react-three/drei"
import { RootState } from "@/store/boundStore"
import { useEffect, useRef, useState } from "react"
import { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useSelector } from "react-redux"
import DecalOnMesh from "./DecalMesh"

interface ModelViewerProps {
  url: string
  decalUrl?: string | null
  onMeshClick?: () => void
}

export default function ModelViewer({ url, decalUrl, onMeshClick }: ModelViewerProps) {
  const { nodes,scene } = useGLTF(url)  // 👈 nodes en vez de scene
  const originalMaterials = useRef<Map<string, THREE.Material | THREE.Material[]>>(new Map())
  const model = useSelector((state: RootState) => state.render3D.modelLoadedInRender)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

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

       originalMaterials.current.set(nodeConfig.nameMesh, mesh.material)
    })
  }, [model, nodes])

  useEffect(() => {
  model?.nodes.filter(n => n.decalConfig).forEach((nodeConfig) => {
    const mesh = nodes[nodeConfig.nameMesh] as THREE.Mesh
    if (!mesh) return

    if (hoveredNode === nodeConfig.nameMesh) {
      // aplica material morado transparente
      mesh.material = new THREE.MeshStandardMaterial({
        color: '#7c3aed',
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      })
    } else {
      // restaura material original
      const original = originalMaterials.current.get(nodeConfig.nameMesh)
      if (original) mesh.material = original as THREE.Material
    }
  })
}, [hoveredNode, model, nodes])

  return (
    <group>
    <primitive
      object={scene}
      castShadow
      receiveShadow
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        const mesh = e.object as THREE.Mesh
        if (mesh.userData.isEditable) onMeshClick?.()
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        const mesh = e.object as THREE.Mesh
        if (mesh.userData.isEditable) {
          setHoveredNode(mesh.userData.nodeConfig.nameMesh)
          document.body.style.cursor = 'pointer'
        }
      }}
      onPointerOut={() => {
        setHoveredNode(null)
        document.body.style.cursor = 'default'
      }}
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