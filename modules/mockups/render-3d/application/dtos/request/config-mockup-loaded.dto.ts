export interface LightingConfig{
  ambientIntensity: number
  ambientColor: string
  lightX: number
  lightY: number
  lightZ: number
  shadows: boolean
}
export interface MaterialConfig{
  roughness: number
  metalness: number
}

export interface EnviromentConfig{
  environmentMap: 'Studio' | 'Outdoor' | 'City' | 'None'
  fogDensity: number
  fogColor: string
}

export interface PostProcessingConfig{
  bloom: boolean
  bloomIntensity: number
  vignette: boolean
  vignetteStrength: number
  toneMapping: 'Linear' | 'Reinhard' | 'Cineon' | 'ACES Filmic'
}
export interface EditConfigState {
  lighting:LightingConfig
  material:MaterialConfig
  environment:EnviromentConfig
  postProcessing:PostProcessingConfig
}
export interface BackgroundConfig {
  color?: string        // color sólido  ej: "#ffffff"
  gradient?: string[]     // degradado     ej: "linear-gradient(to bottom, #000, #fff)"
  image?: string     // url imagen    ej: "https://..."
}
export interface ConfigMockupLoadedDto{
    currentDecalUrl:string,

    modelId:string,
    background: BackgroundConfig
    color:string,
    editConfig:EditConfigState
}