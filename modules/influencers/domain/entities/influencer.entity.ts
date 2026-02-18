import { AgeRange } from "../enums/valid-age-range"
import { BodyShape } from "../enums/valid-body-shape"
import { EyeColor } from "../enums/valid-eye-color"
import { FaceType } from "../enums/valid-face-type"
import { Gender } from "../enums/valid-gender"
import { HairType } from "../enums/valid-hair-typ"
import { LipsType } from "../enums/valid-lips-type"
import { SkinColor } from "../enums/valid-skin-color"

export interface InfluencerEntity{
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