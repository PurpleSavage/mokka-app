import { ThreeEvent } from "@react-three/fiber"
import * as THREE from 'three'
export const handleClick = (e: ThreeEvent<MouseEvent>, onMeshClick?: () => void) => {
  e.stopPropagation()
  const mesh = e.object as THREE.Mesh
  if (!mesh.userData.isEditable) return
  if (mesh.userData.originalMaterial) {
    mesh.material = mesh.userData.originalMaterial
  }
  document.body.style.cursor = 'default'
  onMeshClick?.()
}