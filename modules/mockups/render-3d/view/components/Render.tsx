'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage, ContactShadows, Environment } from '@react-three/drei'
import { ChangeEvent, Suspense, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/boundStore'
import ModelViewer from './ModelViewer'
import ModelLoaderBar from './ModelLoaderBar'
import { setCurrentDecalUrl } from '../../render-3d-slice/render-3d.slice'
import { domRefs } from '@/modules/mockups/shared-mockups/refs-container/dom-refs-container'

export default function Render() {
  const model = useSelector((state:RootState)=>state.render3D.modelLoadedInRender)
  const inputRef = useRef<HTMLInputElement>(null)
  const decalUrl = useSelector((state:RootState)=>state.render3D.configMockupLoaded.currentDecalUrl)
  const dispatch =useDispatch()

  const loadImage =(e: ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    dispatch(setCurrentDecalUrl({
      decalFile:file,
      decalUrl:url
    }))
  }

  if (!model) return null
  
  return (
    <div className="h-full w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={loadImage}
      />
      <ModelLoaderBar/>
      <Canvas 
        shadows 
        camera={{ position: model.cameraSettings.position, fov: model.cameraSettings.fov }}
        onCreated={({ gl }) => {
            const canvas = gl.domElement 
            domRefs.setCanvasRef(canvas)
        }}
      >
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