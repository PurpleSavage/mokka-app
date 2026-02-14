import { TextEntity } from "../../domain/entities/text.entity"
import { GenerateTextDto } from "../dtos/requests/generate-text.dto"

export interface TextApiPort{
    generateText(dto:GenerateTextDto):Promise<TextEntity>
    listTexts(userId:string):Promise<TextEntity[]>
}