import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { CommunityImagePort } from "../../application/ports/community-image.port";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import axios from "axios";
import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";
import { SharedImageEntity } from "../../../../image/domain/entities/shared-image.entity";
import { SharedImageResponseDto } from "../../../../image/application/dtos/response/shared-image-response.dto";
import { toSharedImageEntity } from "../../../../image/infrastructure/mappers/to-shared-image-entity.mapper";


export class CommunityImageService implements CommunityImagePort{
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
    
    async listSharedImages(page: number, limit: number): Promise<SharedImageEntity[]> {
        try {
            const params = new URLSearchParams()
            params.append('page',page.toString())
            params.append('limit',limit.toString())
            const response = await this.httpService.get<SharedImageResponseDto[]>(
                `/v1/image/read/shared?${params}`,
            )
            return response.map((sharedImage)=>toSharedImageEntity(sharedImage))
        } catch (error) {
            this.handleError(error)
        }
    }
    
}