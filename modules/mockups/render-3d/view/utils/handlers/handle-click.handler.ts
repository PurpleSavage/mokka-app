import { ThreeEvent } from "@react-three/fiber"
import * as THREE from 'three'
export const handleClick = (
  e: ThreeEvent<MouseEvent>, 
  onMeshClick?: () => void,
  onHitPoint?: (position: [number, number, number], normal: [number, number, number]) => void
) => {
  e.stopPropagation()
  const mesh = e.object as THREE.Mesh
  if (!mesh.userData.isEditable) return

  const position: [number, number, number] = [e.point.x, e.point.y, e.point.z]
  const normal: [number, number, number] = e.face 
    ? [e.face.normal.x, e.face.normal.y, e.face.normal.z]
    : [0, 0, 1]

  onHitPoint?.(position, normal)

  if (mesh.userData.originalMaterial) {
    mesh.material = mesh.userData.originalMaterial
  }
  document.body.style.cursor = 'default'
  onMeshClick?.()
}