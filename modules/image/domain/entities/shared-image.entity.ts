import { BaseSharedEntity} from "@/modules/shared/common/domain/entities/base-shared-entity";
import { ImageEntity } from "./Image.entity";

export interface SharedImageEntity extends BaseSharedEntity{
    image: ImageEntity
}