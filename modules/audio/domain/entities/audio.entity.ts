import { IdModelsAudio, ModelsAudio } from "../enums/audio-models"

export interface AudioEntity{
    id: string
    user: string
    prompt: string
    createDate: string
    urlAudio: string
    idModel: IdModelsAudio
    nameModelAudio: ModelsAudio
    speed: number
    stability: number
    similarity: number
    exaggeration: number
    useSpeakerBoost: boolean
}