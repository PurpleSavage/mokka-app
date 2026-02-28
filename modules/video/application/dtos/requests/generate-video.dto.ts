import { videoAspectRatioOptions } from '@/modules/influencers/constants/generate-scene-options'
import {z} from 'zod'

const videoAspectRatio =videoAspectRatioOptions.map((v)=>v.id) as [string,...string[]]
export const generateVideoSchema = z.object({
    prompt:z.string().min(1,"The prompt cannot be empty").max(500,"The prompt cannot exceed 500 characters"),
    aspectRatio:z.enum(videoAspectRatio, { message: "Please select a valid aspect ratio"}),
    audio:z.boolean({message:'Volume must be a boolean'})
})
export type GenerateVideoDto = z.infer<typeof generateVideoSchema >

export type FullGenerateVideoDto = GenerateVideoDto & {user:string}