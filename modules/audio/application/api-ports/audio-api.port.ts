import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto"
import { AudioEntity } from "../../domain/entities/audio.entity"
import { GenerateAudioDto } from "../dtos/requests/generate-audio.dto"

export interface AudioApiPort{
    generateAudio(dto:GenerateAudioDto):Promise<ResponseDataSocket<AudioEntity>>
    listAudioHistory(userId: string): Promise<AudioEntity[]>
}