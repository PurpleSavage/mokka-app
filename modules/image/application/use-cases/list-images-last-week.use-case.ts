import { ImagePort } from "../ports/image.port";

export class ListImagesLastWeekUseCase{
    constructor(private readonly imageService:ImagePort){}
    execute(userId:string){
        return this.imageService.listImagesLastWeek(userId)
    }
}