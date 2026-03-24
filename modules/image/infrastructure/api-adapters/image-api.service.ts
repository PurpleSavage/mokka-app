
import { GenerateImageDto } from "../../application/dtos/request/generate-image.dto";
import { ImagePort } from "../../application/ports/image.port";
import { ImageEntity } from "../../domain/entities/Image.entity";
import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { ImageResponseDto } from "../../application/dtos/response/image-response.dto";
import { toImageEntity } from "../mappers/to-image-entity.mapper";
import { SharedImageEntity } from "../../domain/entities/shared-image.entity";
import { ShareImageDto } from "../../application/dtos/request/shared-image.dto";
import { SharedImageResponseDto } from "../../application/dtos/response/shared-image-response.dto";
import { toSharedImageEntity } from "../mappers/to-shared-image-entity.mapper";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import axios from "axios";
import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";



export class ImageApiService implements ImagePort {
    constructor(private readonly httpService:HttpClientPort){}
    private handleError(error: unknown): never {
        if (axios.isAxiosError(error)) {
            throw new ApiErrorPlatform({
                message: error.response?.data?.message || 'An error occurred',
                errorType: error.response?.data?.errorType || ErrorPlatformMokka.MOKKA_ERROR,
                status: error.response?.status || 500,
                details: error.response?.data?.details
            })
        }
        throw error
    }
    async generateImage(dto: GenerateImageDto): Promise<ResponseHttpQueue> {
        try {
            const response = await this.httpService.post<ResponseHttpQueue>(
                '/v1/image/write/generations',dto
            )
            return response
        } catch (error) {
            this.handleError(error)
        }
    }
    async listImages(user: string): Promise<ImageEntity[]> {
        try {
            const response = await this.httpService.get<ImageResponseDto[]>(
               `/v1/image/read/images/${user}`
            )
            return response.map((imageDto)=>toImageEntity(imageDto))
        } catch (error) {
            this.handleError(error)
        }
    }
    async shareImage(dto:ShareImageDto): Promise<SharedImageEntity> {
        try {
            const response = await this.httpService.post<SharedImageResponseDto>(
                '/v1/image/write/share',
                dto
            )
            return toSharedImageEntity(response)
        } catch (error) {
            this.handleError(error)
        }
    }
    async listImagesLastWeek(userId: string): Promise<ImageEntity[]> {
        try {
            const response = await this.httpService.get<ImageResponseDto[]>(`/v1/image/read/last-images/${userId}`)
            return response.map((imageDto)=>toImageEntity(imageDto))
        } catch (error) {
            this.handleError(error)
        }
    }
}