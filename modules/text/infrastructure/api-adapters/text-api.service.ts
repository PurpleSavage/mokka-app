import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { TextApiPort } from "../../application/api-ports/text-api.port";
import { GenerateTextDto } from "../../application/dtos/requests/generate-text.dto";
import { TextEntity } from "../../domain/entities/text.entity";
import { TextResponseDto } from "@/modules/audio/application/dtos/responses/text-response.dto";
import { toTextEntityMapper } from "../mappers/to-text-entity.mapper";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import { AxiosError } from "axios";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";

export class TextApiService implements TextApiPort{
    constructor(private readonly httpService:HttpClientPort){}
    async listTexts(userId: string): Promise<TextEntity[]> {
        try {
            const response = await this.httpService.get<TextResponseDto[]>(`/v1/text/read/history/${userId}`)
            return response.map((data)=>toTextEntityMapper(data))
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new ApiErrorPlatform({
                    message: error.response?.data?.message || 'Error generating text',
                    errorType: error.response?.data?.errorType || ErrorPlatformMokka.MOKKA_ERROR,
                    status: error.response?.status || 500,
                    details: error.response?.data?.details
                })
            }
            throw error
        }
    }
    async generateText(dto: GenerateTextDto): Promise<ResponseHttpQueue> {
        try {
            const response = await this.httpService.post<ResponseHttpQueue>('/v1/text/write/new',dto)
            return response
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new ApiErrorPlatform({
                    message: error.response?.data?.message || 'Error generating text',
                    errorType: error.response?.data?.errorType || ErrorPlatformMokka.MOKKA_ERROR,
                    status: error.response?.status || 500,
                    details: error.response?.data?.details
                })
            }
            throw error
        }
    }
}