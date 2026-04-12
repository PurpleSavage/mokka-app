
export interface BackgroundConfig {
  color?: string        // color sólido  ej: "#ffffff"
  gradient?: string[]     // degradado     ej: "linear-gradient(to bottom, #000, #fff)"
  image?: string     // url imagen    ej: "https://..."
}
export interface ConfigMockupLoadedDto{
    currentDecalUrl:string,
    decalFile:File | null,
    modelId:string,
    background: BackgroundConfig
    color:string,
}