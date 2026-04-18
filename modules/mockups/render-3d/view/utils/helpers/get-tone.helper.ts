import * as THREE from 'three'
import { PostProcessingConfig } from '../../../application/dtos/request/config-mockup-loaded.dto'


export function getToneMapping(value: PostProcessingConfig['toneMapping']): THREE.ToneMapping {
  const map: Record<PostProcessingConfig['toneMapping'], THREE.ToneMapping> = {
    'Linear': THREE.LinearToneMapping,
    'Reinhard': THREE.ReinhardToneMapping,
    'Cineon': THREE.CineonToneMapping,
    'ACES Filmic': THREE.ACESFilmicToneMapping,
  }
  return map[value]
}