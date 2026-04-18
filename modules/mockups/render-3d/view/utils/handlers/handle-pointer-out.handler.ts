import { ThreeEvent } from "@react-three/fiber"
import * as THREE from 'three'
export const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
  const mesh = e.object as THREE.Mesh
  if (mesh.userData.originalMaterial) {
    mesh.material = mesh.userData.originalMaterial
  }
  document.body.style.cursor = 'default'
}