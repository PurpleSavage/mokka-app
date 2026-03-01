import { VideoEntity } from "../../domain/entities/video.entity";
import { GenerateVideoDto } from "../dtos/requests/generate-video.dto";
import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";

export interface VideoPort{
    generateVideo(dto:GenerateVideoDto):Promise<ResponseDataSocket>
    listVideos(user:string):Promise<VideoEntity[]>
}