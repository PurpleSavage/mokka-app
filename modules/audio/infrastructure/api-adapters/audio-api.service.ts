import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port"
import { AudioApiPort } from "../../application/api-ports/audio-api.port"
import { AudioEntity } from "../../domain/entities/audio.entity"
import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto"
import { FullAudioDto } from "../../application/dtos/requests/generate-audio.dto"

export class AudioApiService implements AudioApiPort{
    constructor(private readonly httpService:HttpClientPort){}
    async generateAudio(dto:FullAudioDto):Promise<ResponseDataSocket<AudioEntity>>{
        const response = await this.httpService.post<ResponseDataSocket<AudioEntity>>(
            `/v1/audio/write/generations`,dto
        )
        return response
    }
    async listAudioHistory(userId: string): Promise<AudioEntity[]> {
        const response = await this.httpService.get<AudioEntity[]>(
            `/v1/audio/read/audios/${userId}`
        )
        return response
    }
}