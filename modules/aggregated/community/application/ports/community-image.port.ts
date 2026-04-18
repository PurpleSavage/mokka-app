
import { SharedImageEntity } from "../../../../image/domain/entities/shared-image.entity"


export interface CommunityImagePort{
    //likeImage():Promise<void>
    listSharedImages(page:number,limit:number):Promise<SharedImageEntity[]>
}