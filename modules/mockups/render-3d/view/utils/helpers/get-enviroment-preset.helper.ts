import { EnviromentConfig } from "../../../application/dtos/request/config-mockup-loaded.dto"

type R3FEnvPreset = 'studio' | 'park' | 'city' | 'apartment' | 'dawn' | 'forest' | 'lobby' | 'night' | 'sunset' | 'warehouse'

export function getEnvPreset(value: EnviromentConfig['environmentMap']): R3FEnvPreset {
  const map: Record<Exclude<EnviromentConfig['environmentMap'], 'None'>, R3FEnvPreset> = {
    'Studio': 'studio',
    'Outdoor': 'park',
    'City': 'city',
  }
  return map[value as Exclude<EnviromentConfig['environmentMap'], 'None'>]
}