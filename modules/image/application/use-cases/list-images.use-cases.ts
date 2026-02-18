import { ImagePort } from "../ports/image.port";

export class ListImagesUseCase{
    constructor(private readonly imageService:ImagePort){}
    execute(user:string){
        return this.imageService.listImages(user)
    }
}