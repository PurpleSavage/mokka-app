import { GenerateImageDto } from "../dtos/request/generate-image.dto";
import { ImageEntity } from "../../domain/entities/Image.entity";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import { ShareImageDto } from "../dtos/request/shared-image.dto";
import { SharedImageEntity } from "@/modules/image/domain/entities/shared-image.entity";

export interface ImagePort{
    generateImage(dto:GenerateImageDto):Promise<ResponseHttpQueue>
    listImages(user:string):Promise<ImageEntity[]>
    listImagesLastWeek(userId:string):Promise<ImageEntity[]>
    shareImage(dto:ShareImageDto):Promise<SharedImageEntity>
}