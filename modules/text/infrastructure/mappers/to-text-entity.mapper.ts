import { TextResponseDto } from "@/modules/audio/application/dtos/responses/text-response.dto";
import { TextEntity } from "../../domain/entities/text.entity";
import { DateFormatter } from "@/modules/shared/common/view/utils/date-formatter.util";
import { FormatText, LengthText, PromotingText, ToneText } from "../../domain/enums/options-text";

export function toTextEntityMapper(data:TextResponseDto):TextEntity{
    return {
        id:data.id,
        context:data.context,
        promotionType:data.promotionType as PromotingText,
        title:data.title,
        toneType:data.toneType as ToneText,
        textLength:data.textLength as LengthText,
        textFormat:data.textFormat as FormatText,
        improvedContext:data.improvedContext,
        createDate:DateFormatter.formatTechnical(data.createDate) 
    }
}

