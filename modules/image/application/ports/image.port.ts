import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";
import { GenerateImageDto } from "../dtos/request/generate-image.dto";
import { ImageEntity } from "../../domain/entities/Image.entity";

export interface ImagePort{
    generateImage(dto:GenerateImageDto):Promise<ResponseDataSocket<ImageEntity >>
    listImages(user:string):Promise<ImageEntity[]>
}