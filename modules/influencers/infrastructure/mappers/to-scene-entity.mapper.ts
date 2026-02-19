import { InfluencerScenesDto } from "../../application/dtos/responses/influencer-scenes.dto";
import { InfluencerSceneEntity } from "../../domain/entities/influencer-scene.entity";

export function toSceneEntity(data:InfluencerScenesDto):InfluencerSceneEntity{
    return {
        id:data.id,
        urlScene:data.urlScene,
        prompt:data.prompt,
        influencer:data.influencer,
        volume:data.volume,
        imageBaseUrls:data.imageBaseUrls,
        aspectRatio:data.aspectRatio,
        createdAt:data.createdAt
    }
}