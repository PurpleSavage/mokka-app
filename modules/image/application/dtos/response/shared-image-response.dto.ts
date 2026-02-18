import { BaseSharedResponseDto } from "@/modules/shared/common/application/dtos/responses/base-shared-response.dto";
import { ImageResponseDto } from "./image-response.dto";

export interface SharedImageResponseDto extends BaseSharedResponseDto{
    image: ImageResponseDto | string
}