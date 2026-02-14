import { TextApiPort } from "../api-ports/text-api.port";
import { GenerateTextDto } from "../dtos/requests/generate-text.dto";

export class GenerateTextUseCase{
    constructor(private readonly textService:TextApiPort){}
    execute(dto:GenerateTextDto){
        return this.textService.generateText(dto)
    }
}