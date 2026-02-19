import { VideoAspectRatio } from "../enums/video-aspect-ratio"
import { InfluencerEntity } from "./influencer.entity"

export interface InfluencerSceneEntity{
    id:string
    urlScene:string
    prompt:string
    influencer:InfluencerEntity | string
    volume:boolean
    imageBaseUrls:string[]
    aspectRatio:VideoAspectRatio
    createdAt:string
}