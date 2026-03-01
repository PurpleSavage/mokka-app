import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { GenerateVideoDto } from "../../application/dtos/requests/generate-video.dto";
import { VideoPort } from "../../application/ports/video.port";
import { VideoEntity } from "../../domain/entities/video.entity";
import { ListVideosResponseDto } from "../../application/dtos/responses/list-videos-reponse.dto";
import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";
import { toVideoEntity } from "../mappers/to-video-entity.mapper";

export class VideoApiService implements VideoPort{
    constructor(private readonly httpService:HttpClientPort){}
    async generateVideo(dto:GenerateVideoDto):Promise<ResponseDataSocket>{
        const response=await this.httpService.post<ResponseDataSocket>(
            `/v1/video/write/generations`,
            dto
        )
        return response
    }
    async listVideos(user: string): Promise<VideoEntity[]> {
        const response = await this.httpService.get<ListVideosResponseDto[]>(
            `/v1/video/read/videos/${user}`
        )
        return response.map((video)=>toVideoEntity(video))
    }
}