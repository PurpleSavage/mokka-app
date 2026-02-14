import { FormatText, LengthText, PromotingText, ToneText } from "../enums/options-text"

export interface TextEntity{
    id:string
    context:string,
    promotionType:PromotingText,
    title:string,
    toneType:ToneText,
    textLength:LengthText,
    textFormat:FormatText,
    improvedContext:string,
    createDate:string
}