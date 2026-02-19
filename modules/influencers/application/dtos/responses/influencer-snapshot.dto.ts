import { Environment } from "@/modules/influencers/domain/enums/valid-enviroments"
import { InfluencerResponseDto } from "./influencer-response.dto"
import { OutfitType } from "@/modules/influencers/domain/enums/valid-outfits"

export interface InfluencerSnapshotDto{
    influencer:InfluencerResponseDto| string
    snapshotUrl:string
    prompt:string
    enviroment:Environment
    outfitStyle:OutfitType
    createdAt:string
    id:string  
}