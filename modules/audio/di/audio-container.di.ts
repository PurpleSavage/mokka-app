import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter"
import { GenerateAudioUseCase } from "../application/use-cases/generate-audio.use-case"
import { AudioApiService } from "../infrastructure/api-adapters/audio-api.service"
import { ListAudiosHistory } from "../application/use-cases/list-audios-history.use-case"
import { GenerateAudioDto } from "../application/dtos/requests/generate-audio.dto"


const audioService = new AudioApiService(httpClient)
const useCases={
    generateAudio: new GenerateAudioUseCase(audioService),
    listAudioHistory: new ListAudiosHistory(audioService)
}
export const audioDi={
    generateAudio:(dto: GenerateAudioDto)=>useCases.generateAudio.execute(dto),
    listAudioHistory:(userId:string)=>useCases.listAudioHistory.execute(userId)
}