import { AgeRange } from "@/modules/influencers/domain/enums/valid-age-range"
import { BodyShape } from "@/modules/influencers/domain/enums/valid-body-shape"
import { EyeColor } from "@/modules/influencers/domain/enums/valid-eye-color"
import { FaceType } from "@/modules/influencers/domain/enums/valid-face-type"
import { Gender } from "@/modules/influencers/domain/enums/valid-gender"
import { HairType } from "@/modules/influencers/domain/enums/valid-hair-typ"
import { LipsType } from "@/modules/influencers/domain/enums/valid-lips-type"
import { SkinColor } from "@/modules/influencers/domain/enums/valid-skin-color"

export interface InfluencerResponseDto{
    id: string
    name: string
    ageRange: AgeRange
    gender: Gender
    bodyShape: BodyShape
    skinColor: SkinColor
    eyeColor: EyeColor
    hairType: HairType
    faceType: FaceType
    country: string
    lipsType: LipsType
    hairColor: string
    height: number
    influencerUrlImage:string
    createDate: string
    sizeImage:string
}