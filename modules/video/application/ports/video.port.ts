import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import { VideoEntity } from "../../domain/entities/video.entity";
import { FullGenerateVideoDto} from "../dtos/requests/generate-video.dto";


export interface VideoPort{
    generateVideo(dto:FullGenerateVideoDto):Promise<ResponseHttpQueue>
    listVideos(user:string):Promise<VideoEntity[]>
}