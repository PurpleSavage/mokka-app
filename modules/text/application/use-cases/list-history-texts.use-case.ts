import { TextApiPort } from "../api-ports/text-api.port";

export class ListHitoryTextsUseCase{
    constructor(private readonly textService:TextApiPort){}
    execute(userId:string){
        return this.textService.listTexts(userId)
    }
}