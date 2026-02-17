import { GenerateImageDto } from "../dtos/request/generate-image.dto";
import { ImagePort } from "../ports/image.port";

export class GenerateImageUseCase{
    constructor(private readonly imageService:ImagePort){}
    execute(dto:GenerateImageDto){
        return this.imageService.generateImage(dto)
    }
}