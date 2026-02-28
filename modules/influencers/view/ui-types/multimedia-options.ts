export const OriginComponentOptions = {
    snapshot: 'SNAPSHOT',
    scene: 'SCENE'
} as const

export type OriginComponentOptionsType = typeof OriginComponentOptions[keyof typeof OriginComponentOptions]