import { InfluencerResponseDto } from "../../application/dtos/responses/influencer-response.dto";
import { InfluencerEntity } from "../../domain/entities/influencer.entity";

export function toInfluencerEntity(data:InfluencerResponseDto):InfluencerEntity{
    return {
        id: data.id,
        name: data.name,
        ageRange: data.ageRange,
        gender: data.gender,
        bodyShape: data.bodyShape,
        skinColor: data.skinColor,
        eyeColor: data.eyeColor,
        hairType: data.hairType,
        faceType: data.faceType,
        country: data.country,
        lipsType: data.lipsType,
        hairColor: data.hairColor,
        height: data.height,
        influencerUrlImage:data.influencerUrlImage,
        createDate: data.createDate,
        sizeImage:data.sizeImage
    }
}