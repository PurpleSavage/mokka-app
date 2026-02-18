import { AspectRatioImage } from "@/modules/image/domain/enums/aspect-ratio-image"
import { AllSubStyles, TypeStyle } from "@/modules/image/domain/enums/image-styles"

export interface ImageResponseDto{
    id: string
    prompt: string
    createDate: string
    width: number
    height: number
    imageUrl: string
    aspectRatio: AspectRatioImage
    size: string
    style: TypeStyle
    subStyle: AllSubStyles
}