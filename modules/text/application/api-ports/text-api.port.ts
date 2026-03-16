import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto"
import { TextEntity } from "../../domain/entities/text.entity"
import { GenerateTextDto } from "../dtos/requests/generate-text.dto"

export interface TextApiPort{
    generateText(dto:GenerateTextDto):Promise<ResponseHttpQueue>
    listTexts(userId:string):Promise<TextEntity[]>
}