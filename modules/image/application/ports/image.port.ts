import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";
import { GenerateImageDto } from "../dtos/request/generate-image.dto";
import { ImageEntity } from "../../domain/entities/Image.entity";
import { SharedImageEntity } from "./shared-image.entity";
import { ShareImageDto } from "../dtos/request/shared-image.dto";

export interface ImagePort{
    generateImage(dto:GenerateImageDto):Promise<ResponseDataSocket<ImageEntity >>
    listImages(user:string):Promise<ImageEntity[]>
    shareImage(dto:ShareImageDto):Promise<SharedImageEntity>
}