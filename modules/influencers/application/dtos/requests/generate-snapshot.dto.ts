import { aspectRatioOptions, enviromentsOptions, outfitOptions } from "@/modules/influencers/constants/generate-snapshot-options";
import { z } from "zod";

const aspectRatio =aspectRatioOptions.map((a)=>a.id) as [string,...string[]]
const outfit=outfitOptions.map((a)=>a.id) as [string,...string[]]
const enviroments=enviromentsOptions.map((a)=>a.id) as [string,...string[]]
export const generateSnapShotSchema = z.object({
    prompt:z.string().min(1, "The name cannot be empty"),
    aspectRatio:z.enum(aspectRatio, { message: "Please select a valid aspect ratio"}),
    outfitStyle:z.enum(outfit, { message: "Please select a valid outfit"}),
    enviroment:z.enum(enviroments, { message: "Please select a valid enviroments"}),
})

export type GenerateSnapshotDto = z.infer<typeof generateSnapShotSchema >

export type FullGenerateSnapshotDto = GenerateSnapshotDto & {user:string,url:string,influencer:string}