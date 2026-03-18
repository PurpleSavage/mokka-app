import { BaseSahredEntity } from "@/modules/shared/common/domain/entities/base-shared-entity";
import { ImageEntity } from "./Image.entity";

export interface SharedImageEntity extends BaseSahredEntity{
    image: ImageEntity | string
}