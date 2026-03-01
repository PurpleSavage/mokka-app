import { ListVideosResponseDto } from "../../application/dtos/responses/list-videos-reponse.dto";
import { VideoEntity } from "../../domain/entities/video.entity";

export function toVideoEntity(videoDto:ListVideosResponseDto):VideoEntity{
    return {
        id:videoDto.id,
        videoUrl:videoDto.videoUrl,
        prompt:videoDto.prompt,
        createDate:videoDto.createDate,
        aspectRatio:videoDto.aspectRatio,
        audio:videoDto.audio
    }
}