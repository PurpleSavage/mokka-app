import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter"
import { GenerateImageUseCase } from "../application/use-cases/generate-image.use-case"
import { ImageApiService } from "../infrastructure/api-adapters/image-api.service"
import { GenerateImageDto } from "../application/dtos/request/generate-image.dto"

const imageService = new ImageApiService(httpClient)
const useCases = {
    generateImage:new GenerateImageUseCase(imageService)
}

export const imageDI = {
        generateImage: (dto:GenerateImageDto)=>useCases.generateImage.execute(dto)
}