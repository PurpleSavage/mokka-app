import { VideoAspectRatio } from "@/modules/influencers/domain/enums/video-aspect-ratio"
import { InfluencerResponseDto } from "./influencer-response.dto"

export interface InfluencerScenesDto{
    id:string
    urlScene:string
    prompt:string
    influencer:InfluencerResponseDto | string
    volume:boolean
    imageBaseUrls:string[]
    aspectRatio:VideoAspectRatio
    createdAt:string
}