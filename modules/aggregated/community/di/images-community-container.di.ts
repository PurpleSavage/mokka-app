import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter"
import { ListSharedImagesUseCase } from "../application/use-cases/list-shared-image.use-case"
import { CommunityImageService } from "../infrastructure/api/community-image.service"


const imageCommunityService = new CommunityImageService(httpClient)
const useCases ={
    listSharedImages: new ListSharedImagesUseCase(imageCommunityService)
}

export const imageCommunityDI = {   
    listSharedImages:(page:number=1,limit:number=20)=>useCases.listSharedImages.execute(page,limit)
}