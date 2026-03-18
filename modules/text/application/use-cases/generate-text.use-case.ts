import { TextApiPort } from "../api-ports/text-api.port";
import { FullGenerateTextDto} from "../dtos/requests/generate-text.dto";

export class GenerateTextUseCase{
    constructor(private readonly textService:TextApiPort){}
    execute(dto:FullGenerateTextDto){
        return this.textService.generateText(dto)
    }
}