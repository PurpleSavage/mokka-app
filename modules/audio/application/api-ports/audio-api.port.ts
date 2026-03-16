
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto"
import { AudioEntity } from "../../domain/entities/audio.entity"
import { FullAudioDto } from "../dtos/requests/generate-audio.dto"

export interface AudioApiPort{
    generateAudio(dto:FullAudioDto):Promise<ResponseHttpQueue>
    listAudioHistory(userId: string): Promise<AudioEntity[]>
}