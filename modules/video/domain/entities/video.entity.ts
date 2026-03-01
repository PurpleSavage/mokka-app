import { VideoAspectRatio } from "@/modules/shared/common/domain/enums/aspect-ratio-video"

export interface VideoEntity{
    id:string,
    videoUrl:string
    prompt:string 
    createDate:Date
    aspectRatio:VideoAspectRatio
    audio:boolean
}