'use client'

import SwitchElement from "@/modules/shared/common/view/components/SwitchElement"
import Row from "./Row"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/boundStore"
import { setEnvironmentConfig, setLightingConfig, setMaterialConfig, setPostProcessingConfig } from "../../render-3d-slice/render-3d.slice"
import { EnviromentConfig, PostProcessingConfig } from "../../application/dtos/request/config-mockup-loaded.dto"
import DropDown, { Option } from "@/modules/shared/common/view/components/DropDown"
import { useDebounce } from "@/modules/shared/common/view/custom-hooks/useDebounce"
import { useState } from "react"


const envOptions: Option<EnviromentConfig['environmentMap']>[] = [
  { id: '1', name: 'Studio' },
  { id: '2', name: 'Outdoor' },
  { id: '3', name: 'City' },
  { id: '4', name: 'None' },
]

const toneMappingOptions: Option<PostProcessingConfig['toneMapping']>[] = [
  { id: '1', name: 'Linear' },
  { id: '2', name: 'Reinhard' },
  { id: '3', name: 'Cineon' },
  { id: '4', name: 'ACES Filmic' },
]

export default function EditSection() {
  const {editConfig}=useSelector((state:RootState)=>state.render3D.configMockupLoaded)
  const { lighting, material, environment, postProcessing } = editConfig
  const [localAmbientColor, setLocalAmbientColor] = useState(lighting.ambientColor)
  const [localFogColor, setLocalFogColor] = useState(environment.fogColor)
  const dispatch = useDispatch()

  const dispatchAmbientColor = useDebounce((color: string) => {
    dispatch(setLightingConfig({ ...lighting, ambientColor: color }))
  }, 100)

  const dispatchFogColor = useDebounce((color: string) => {
    dispatch(setEnvironmentConfig({ ...environment, fogColor: color }))
  }, 100)
  return (
    <div className="space-y-6 flex-1 min-h-0 overflow-y-auto">

      {/* Lighting */}
      <div className="space-y-2 border-b border-white/10 pb-1">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">Lighting</p>
        <div className="space-y-1">
          <Row label="Ambient intensity">
            <input type="range" min={0} max={100}
              value={lighting.ambientIntensity}
              onChange={e => dispatch(setLightingConfig({ ...lighting, ambientIntensity: Number(e.target.value) }))}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer" />
          </Row>
          <Row label="Ambient color">
            <input type="color"
              value={localAmbientColor}
              onChange={e =>{
                setLocalAmbientColor(e.target.value) 
                dispatchAmbientColor(e.target.value)
              }}
              className="w-full h-9 rounded-lg cursor-pointer" />
          </Row>
          <Row label="Light X">
            <input type="range" min={-10} max={10}
              value={lighting.lightX}
              onChange={e => dispatch(setLightingConfig({ ...lighting, lightX: Number(e.target.value) }))}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer" />
          </Row>
          <Row label="Light Y">
            <input type="range" min={-10} max={10}
              value={lighting.lightY}
              onChange={e => dispatch(setLightingConfig({ ...lighting, lightY: Number(e.target.value) }))}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer" />
          </Row>
          <Row label="Light Z">
            <input type="range" min={-10} max={10}
              value={lighting.lightZ}
              onChange={e => dispatch(setLightingConfig({ ...lighting, lightZ: Number(e.target.value) }))}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer" />
          </Row>
          <Row label="Shadows">
            <SwitchElement
              enabled={lighting.shadows}
              setEnabled={v => dispatch(setLightingConfig({ ...lighting, shadows: v }))} />
          </Row>
        </div>
      </div>

      {/* Material */}
      <div className="space-y-2 border-b border-white/10 pb-1">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">Material</p>
        <div className="space-y-1">
          <Row label="Roughness">
            <input type="range" min={0} max={100}
              value={material.roughness}
              onChange={e => dispatch(setMaterialConfig({ ...material, roughness: Number(e.target.value) }))}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer" />
          </Row>
          <Row label="Metalness">
            <input type="range" min={0} max={100}
              value={material.metalness}
              onChange={e => dispatch(setMaterialConfig({ ...material, metalness: Number(e.target.value) }))}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer " />
          </Row>
        </div>
      </div>

      {/* Environment */}
      <div className="space-y-2 border-b border-white/10 pb-1">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">Environment</p>
        <div className="space-y-1">
          <Row label="Environment">
            <DropDown
              options={envOptions}
              selected={environment.environmentMap}
              handleSelect={option => dispatch(setEnvironmentConfig({ ...environment, environmentMap: option.name }))}
            />
          </Row>
          <Row label="Fog density">
            <input type="range" min={0} max={100}
              value={environment.fogDensity}
              onChange={e => dispatch(setEnvironmentConfig({ ...environment, fogDensity: Number(e.target.value) }))}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer"/>
          </Row>
          <Row label="Fog color">
            <input type="color"
              value={localFogColor}
              onChange={e => {
                setLocalFogColor(e.target.value)
                dispatchFogColor(e.target.value)
              }}
              className="w-full h-9 rounded-lg cursor-pointer" />
          </Row>
        </div>
      </div>

      {/* Post-processing */}
      <div className="space-y-2">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">Post-processing</p>
        <div className="space-y-1">
          <Row label="Bloom">
            <SwitchElement
              enabled={postProcessing.bloom}
              setEnabled={v => dispatch(setPostProcessingConfig({ ...postProcessing, bloom: v }))} />
          </Row>
          <Row label="Bloom intensity">
            <input type="range" min={0} max={100}
              value={postProcessing.bloomIntensity}
              onChange={e => dispatch(setPostProcessingConfig({ ...postProcessing, bloomIntensity: Number(e.target.value) }))}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer"/>
          </Row>
          <Row label="Vignette">
            <SwitchElement
              enabled={postProcessing.vignette}
              setEnabled={v => dispatch(setPostProcessingConfig({ ...postProcessing, vignette: v }))} />
          </Row>
          <Row label="Vignette strength">
            <input type="range" min={0} max={100}
              value={postProcessing.vignetteStrength}
              onChange={e => dispatch(setPostProcessingConfig({ ...postProcessing, vignetteStrength: Number(e.target.value) }))}
              className="w-full h-1 rounded-lg bg-white accent-pink-800 cursor-pointer" />
          </Row>
          <Row label="Tone mapping">
            <DropDown
              options={toneMappingOptions}
              selected={postProcessing.toneMapping}
              handleSelect={option => dispatch(setPostProcessingConfig({ ...postProcessing, toneMapping: option.name }))}
            />
          </Row>
        </div>
      </div>

    </div>
  )
}
