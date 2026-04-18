import { toImageEntity } from "@/modules/image/infrastructure/mappers/to-image-entity.mapper"
import { SharedImageEntity } from "../../domain/entities/shared-image.entity"
import { SharedImageResponseDto } from "../../application/dtos/response/shared-image-response.dto"


export function toSharedImageEntity(data:SharedImageResponseDto):SharedImageEntity{ 
    const imageResult = typeof data.image ==='string' ? data.image : toImageEntity(data.image)
    return {
        remixes:data.remixes,
        sharedBy:data.sharedBy,
        image:imageResult,
        id:data.id,
        downloads:data.downloads
        
    }
}