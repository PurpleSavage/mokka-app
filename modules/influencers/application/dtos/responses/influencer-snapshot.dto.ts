
import { Environment } from "@/modules/influencers/domain/enums/valid-enviroment"
import { InfluencerResponseDto } from "./influencer-response.dto"
import { OutfitType } from "@/modules/influencers/domain/enums/valid-outfits"
import { AspectRatioImage } from "@/modules/shared/common/domain/enums/aspect-ratio-image"

export interface InfluencerSnapshotDto{
    influencer:InfluencerResponseDto| string
    snapshotUrl:string
    prompt:string
    enviroment:Environment
    outfitStyle:OutfitType
    createdAt:string
    aspectRatio:AspectRatioImage
    id:string  
}

