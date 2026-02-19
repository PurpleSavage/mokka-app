import { Environment } from "../enums/valid-enviroments"
import { OutfitType } from "../enums/valid-outfits"

import { InfluencerEntity } from "./influencer.entity"

export interface InfluencerSnapshotEntity{
    influencer:InfluencerEntity | string
    snapshotUrl:string
    prompt:string
    enviroment:Environment
    outfitStyle:OutfitType
    createdAt:string
    id:string  
}