import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { TextApiPort } from "../../application/api-ports/text-api.port";
import { GenerateTextDto } from "../../application/dtos/requests/generate-text.dto";
import { TextEntity } from "../../domain/entities/text.entity";
import { TextResponseDto } from "@/modules/audio/application/dtos/responses/text-response.dto";
import { toTextEntityMapper } from "../mappers/to-text-entity.mapper";

export class TextApiService implements TextApiPort{
    constructor(private readonly httpService:HttpClientPort){}
    async listTexts(userId: string): Promise<TextEntity[]> {
        const response = await this.httpService.get<TextResponseDto[]>(`/v1/text/read/history/${userId}`)
        return response.map((data)=>toTextEntityMapper(data))
    }
    async generateText(dto: GenerateTextDto): Promise<TextEntity> {
        const response = await this.httpService.post<TextResponseDto>('/v1/text/write/new',dto)
        return toTextEntityMapper(response)
    }
}