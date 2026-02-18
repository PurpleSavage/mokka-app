import { SharedImageResponseDto } from "../../application/dtos/response/shared-image-response.dto";
import { SharedImageEntity } from "../../application/ports/shared-image.entity";
import { toImageEntity } from "./to-image-entity.mapper";

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