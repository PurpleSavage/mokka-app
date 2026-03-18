
import { GenerateImageDto } from "../dtos/request/generate-image.dto";
import { ImageEntity } from "../../domain/entities/Image.entity";
import { SharedImageEntity } from "../../domain/entities/shared-image.entity";
import { ShareImageDto } from "../dtos/request/shared-image.dto";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";

export interface ImagePort{
    generateImage(dto:GenerateImageDto):Promise<ResponseHttpQueue>
    listImages(user:string):Promise<ImageEntity[]>
    shareImage(dto:ShareImageDto):Promise<SharedImageEntity>
}