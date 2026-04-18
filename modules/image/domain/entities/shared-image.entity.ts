import { ImageEntity } from "@/modules/image/domain/entities/Image.entity";
import { BaseSharedEntity} from "@/modules/shared/common/domain/entities/base-shared-entity";


export interface SharedImageEntity extends BaseSharedEntity{
    image: ImageEntity 
}