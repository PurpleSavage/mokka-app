import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto"
import { AudioEntity } from "../../domain/entities/audio.entity"
import { FullAudioDto } from "../dtos/requests/generate-audio.dto"

export interface AudioApiPort{
    generateAudio(dto:FullAudioDto):Promise<ResponseDataSocket<AudioEntity>>
    listAudioHistory(userId: string): Promise<AudioEntity[]>
}