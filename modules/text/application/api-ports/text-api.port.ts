import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto"
import { TextEntity } from "../../domain/entities/text.entity"
import { FullGenerateTextDto} from "../dtos/requests/generate-text.dto"

export interface TextApiPort{
    generateText(dto:FullGenerateTextDto):Promise<ResponseHttpQueue>
    listTexts(userId:string):Promise<TextEntity[]>
}