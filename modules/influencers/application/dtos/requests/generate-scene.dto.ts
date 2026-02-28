
import { videoAspectRatioOptions } from "@/modules/influencers/constants/generate-scene-options";
import { z } from "zod";

const videoAspectRatio =videoAspectRatioOptions.map((v)=>v.id) as [string,...string[]]
export const generateSceneSchema = z.object({
    imageBaseUrls:z.array(z.string()).min(1, "Please select at least one reference image"),
    prompt:z.string().min(1, "The name cannot be empty"),
    aspectRatio:z.enum(videoAspectRatio, { message: "Please select a valid aspect ratio"}),
    volume:z.boolean({message:'Volume must be a boolean'})
})
export type GenerateSceneDto = z.infer<typeof generateSceneSchema>

export type FullGenerateSceneDto = GenerateSceneDto & {user:string,influencer:string}
