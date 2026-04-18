import { ImageResponseDto } from "@/modules/image/application/dtos/response/image-response.dto";
import { BaseSharedResponseDto } from "@/modules/shared/common/application/dtos/responses/base-shared-response.dto";


export interface SharedImageResponseDto extends BaseSharedResponseDto{
    image: ImageResponseDto
}