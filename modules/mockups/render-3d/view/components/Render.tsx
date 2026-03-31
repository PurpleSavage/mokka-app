'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'

export default function Render() {
  return (
    <div className="h-full w-full ">
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={1.5}>
            {/* Aquí irán tus modelos renderizados según el store */}
            <mesh>
              <boxGeometry />
              <meshStandardMaterial color="royalblue" />
            </mesh>
          </Stage>
          <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      </Canvas>
    </div>
  )
}