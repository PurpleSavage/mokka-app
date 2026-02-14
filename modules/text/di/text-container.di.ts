import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter"

import { TextApiService } from "../infrastructure/api-adapters/text-api.service"
import { GenerateTextUseCase } from "../application/use-cases/generate-text.use-case"
import { ListHitoryTextsUseCase } from "../application/use-cases/list-history-texts.use-case"
import { GenerateTextDto } from "../application/dtos/requests/generate-text.dto"


const textService = new TextApiService(httpClient)
export const useCases = {
    listHistoryTexts:new ListHitoryTextsUseCase(textService),
    generateText: new GenerateTextUseCase(textService)
}

export const textDI= {
    listHistoryTexts:(userId:string)=>useCases.listHistoryTexts.execute(userId),
    generateText:(dto:GenerateTextDto)=>useCases.generateText.execute(dto)
}