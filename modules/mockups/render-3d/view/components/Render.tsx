'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, ContactShadows, Environment } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/boundStore'
import ModelViewer from './ModelViewer'
import ModelLoaderBar from './ModelLoaderBar'

export default function Render() {
  const model = useSelector((state:RootState)=>state.render3D.modelLoadedInRender)
  const inputRef = useRef<HTMLInputElement>(null)
  const [decalUrl, setDecalUrl] = useState<string | null>(null)
  if (!model) return null
  
  return (
    <div className="h-full w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          setDecalUrl(URL.createObjectURL(file))
        }}
      />
      <ModelLoaderBar/>
      <Canvas shadows camera={{ position: model.cameraSettings.position, fov: model.cameraSettings.fov }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} castShadow />
        <directionalLight position={[-5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Stage intensity={0.5} environment={null} adjustCamera={1.5}>
            <ModelViewer
              url={model.modelUrl}
              key={model.modelUrl}
              decalUrl={decalUrl}
              onMeshClick={() => inputRef.current?.click()}  
            />
          </Stage>
          <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      </Canvas>
    </div>
  )
}