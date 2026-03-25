import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { FullGenerateVideoDto} from "../../application/dtos/requests/generate-video.dto";
import { VideoPort } from "../../application/ports/video.port";
import { VideoEntity } from "../../domain/entities/video.entity";
import { ListVideosResponseDto } from "../../application/dtos/responses/list-videos-reponse.dto";

import { toVideoEntity } from "../mappers/to-video-entity.mapper";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import axios from "axios";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";

export class VideoApiService implements VideoPort{
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
    async generateVideo(dto:FullGenerateVideoDto):Promise<ResponseHttpQueue>{
        try {
            const response=await this.httpService.post<ResponseHttpQueue>(
                `/v1/video/write/generations`,
                dto
            )
            return response
        } catch (error) {
            this.handleError(error)
        }
    }
    async listVideos(user: string): Promise<VideoEntity[]> {
        try {
            const response = await this.httpService.get<ListVideosResponseDto[]>(
                `/v1/video/read/videos/${user}`
            )
            return response.map((video)=>toVideoEntity(video))
        } catch (error) {
            this.handleError(error)
        }
    }
}