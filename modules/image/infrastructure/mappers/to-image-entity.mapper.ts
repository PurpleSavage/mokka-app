import { ImageResponseDto } from "../../application/dtos/response/image-response.dto";
import { ImageEntity } from "../../domain/entities/Image.entity";

export function toImageEntity(data:ImageResponseDto):ImageEntity{
    return {
        id: data.id,
        prompt: data.prompt,
        createDate:data.createDate,
        width:data.width,
        height:data.height,
        imageUrl:data.imageUrl,
        aspectRatio:data.aspectRatio,
        size:data.size,
        style:data.style,
        subStyle:data.subStyle,
    }
}