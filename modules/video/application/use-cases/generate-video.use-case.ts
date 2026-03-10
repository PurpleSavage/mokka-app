import { FullGenerateVideoDto } from "../dtos/requests/generate-video.dto";
import { VideoPort } from "../ports/video.port";

export class GenerateVideoUseCase{
    constructor(private readonly videoService:VideoPort){}
    execute(dto:FullGenerateVideoDto){  
        return this.videoService.generateVideo(dto)
    }
}