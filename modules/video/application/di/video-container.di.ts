import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter"

import { ListVideosUseCase } from "../use-cases/list-videos.use-case"
import { VideoApiService } from "../../infrastructure/adapters/video-api.service"
import { GenerateVideoUseCase } from "../use-cases/generate-video.use-case"
import { GenerateVideoDto } from "../dtos/requests/generate-video.dto"

const videoService = new VideoApiService(httpClient)
const useCases={
    listVideos: new ListVideosUseCase(videoService),
    generateVideo: new GenerateVideoUseCase(videoService)
}

export const videoContainer={
    listVideos:(user:string)=>useCases.listVideos.execute(user),
    generateVideo:(dto:GenerateVideoDto)=>useCases.generateVideo.execute(dto)
}