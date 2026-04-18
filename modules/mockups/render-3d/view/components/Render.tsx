'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { ChangeEvent, Suspense, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/boundStore'
import ModelViewer from './ModelViewer'
import ModelLoaderBar from './ModelLoaderBar'
import { setCurrentDecalUrl } from '../../render-3d-slice/render-3d.slice'
import { domRefs } from '@/modules/mockups/shared-mockups/refs-container/dom-refs-container'
import { backgroundGradientBuilder, OrientationGradient } from '../utils/styles/background-gradient-builder'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { getEnvPreset } from '../utils/helpers/get-enviroment-preset.helper'
import { getToneMapping } from '../utils/helpers/get-tone.helper'




export default function Render() {
  const model = useSelector((state:RootState)=>state.render3D.modelLoadedInRender)
  const inputRef = useRef<HTMLInputElement>(null)
  const backgroundColor = useSelector((state: RootState) => state.render3D.configMockupLoaded.background?.color)
  const backgroundGradient = useSelector((state: RootState) => state.render3D.configMockupLoaded.background?.gradient)
  const backgroundImage = useSelector((state: RootState) => state.render3D.configMockupLoaded.background?.image)
  const decalUrl = useSelector((state:RootState)=>state.render3D.configMockupLoaded.currentDecalUrl)
  const {editConfig}=useSelector((state:RootState)=>state.render3D.configMockupLoaded)
  const { lighting, material, environment, postProcessing } = editConfig

  const dispatch =useDispatch()

  

  const backgroundStyle = useMemo(() => {
    if (backgroundColor) return { background: backgroundColor }
    if (backgroundGradient) return { background: backgroundGradientBuilder(backgroundGradient, OrientationGradient.TO_BOTTOM) }
    if (backgroundImage) return { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    return {}
  }, [backgroundColor, backgroundGradient, backgroundImage])

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
    <div className="h-full w-full" style={backgroundStyle}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={loadImage}
      />
      <ModelLoaderBar/>
      <Canvas 
        shadows={lighting.shadows} 
        camera={{ position: model.cameraSettings.position, fov: model.cameraSettings.fov }}
        onCreated={({ gl }) => {
             gl.toneMapping = getToneMapping(postProcessing.toneMapping) 
            domRefs.setCanvasRef(gl.domElement)
        }}
      >
        <ambientLight 
          intensity={lighting.ambientIntensity / 100} 
          color={lighting.ambientColor} 
        />
        <directionalLight 
          position={[lighting.lightX, lighting.lightY, lighting.lightZ]} 
          intensity={1} 
          castShadow={lighting.shadows} 
        />
        {environment.fogDensity > 0 && (
          <fog attach="fog" args={[environment.fogColor, 10, 100 - environment.fogDensity]} />
        )}

        <Suspense fallback={null}>
              {environment.environmentMap !== 'None' && (
              <Environment preset={getEnvPreset(environment.environmentMap)} />
            )}

          <ModelViewer
              url={model.modelUrl}
              key={model.modelUrl}
              decalUrl={decalUrl}
              roughness={material.roughness / 100}
              metalness={material.metalness / 100}
              onMeshClick={() => inputRef.current?.click()}  
            />
          
        </Suspense>
        {(postProcessing.bloom || postProcessing.vignette) && (
          <EffectComposer>
            {postProcessing.bloom ? <Bloom intensity={postProcessing.bloomIntensity / 100} /> : <></>}
            {postProcessing.vignette ? <Vignette darkness={postProcessing.vignetteStrength / 100} /> : <></>}
          </EffectComposer>
        )}
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      </Canvas>
    </div>
  )
}