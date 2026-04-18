import { ThreeEvent } from "@react-three/fiber"
import * as THREE from 'three'

const HOVER_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#7c3aed',
  transparent: true,
  opacity: 0.8,
  depthWrite: false,
})


export const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
  const mesh = e.object as THREE.Mesh
  if (!mesh.userData.isEditable) return
  if (!mesh.userData.originalMaterial) {
    mesh.userData.originalMaterial = mesh.material
  }
  mesh.material = HOVER_MATERIAL
  document.body.style.cursor = 'pointer'
}