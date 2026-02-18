import { ageRangeOptions, bodyShapeOptions, eyeColorOptions, faceTypeOptions, genderOptions, hairColorOptions, hairTypeOptions, lipsTypeOptions, skinColorOptions } from "@/modules/influencers/constants/generate-influencer-options";

import { z } from "zod";

const gender =genderOptions.map((g)=>g.id) as [string,...string[]]
const bodyShape=bodyShapeOptions.map(m=>m.id) as [string,...string[]]
const skinColor = skinColorOptions.map(s=>s.id) as [string,...string[]]
const eyeColor =eyeColorOptions.map(e=>e.id)as [string,...string[]]
const hairType=hairTypeOptions.map(h=>h.id) as [string,...string[]]
const facetype =faceTypeOptions.map(f=>f.id) as [string,...string[]]
const lipsType = lipsTypeOptions.map(l=>l.id) as [string,...string[]]
const hairColor = hairColorOptions.map(hc=>hc.id) as [string,...string[]]
const ageRange =ageRangeOptions.map(a=>a.id) as [string,...string[]]

export const generateInfluencerSchema = z.object({
 
    name: z.string().min(1, "The name cannot be empty"),
    ageRange: z.enum(ageRange, { message: "Please select a valid ageRange"}),
    gender: z.enum(gender, { message: "Please select a valid gender"}),
    bodyShape: z.enum(bodyShape, { message: "Please select a valid body shape"}),
    skinColor: z.enum(skinColor, { message: "Please select a valid skin color"}),
    eyeColor: z.enum(eyeColor, { message: "Please select a valid  eye color"}),
    hairType: z.enum(hairType, { message: "Please select a valid hair type"}),
    faceType: z.enum(facetype, { message: "Please select a valid face type"}),
    country: z.string().min(1, "The country cannot be empty"),
    lipsType: z.enum(lipsType, { message: "Please select a valid lips type"}),
    hairColor: z.enum(hairColor , { message: "Please select a valid hair color"}),
    height:z.number().min(120).max(250,"height must be between 120cm and 250cm")
})
export type GenerateInfluencerDto = z.infer<typeof generateInfluencerSchema>

export type FullGenerateInfluencerDto = GenerateInfluencerDto & {user:string}