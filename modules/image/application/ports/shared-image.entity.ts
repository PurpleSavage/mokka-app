import { BaseSahredEntity } from "@/modules/shared/common/domain/entities/base-shared-entity";
import { ImageEntity } from "../../domain/entities/Image.entity";

export interface SharedImageEntity extends BaseSahredEntity{
    image: ImageEntity | string
}