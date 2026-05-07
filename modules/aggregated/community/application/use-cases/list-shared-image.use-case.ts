import { SharedImageEntity } from "@/modules/image/domain/entities/shared-image.entity";
import { CommunityImagePort } from "../ports/community-image.port";
import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto";

export class ListSharedImagesUseCase{
    constructor(
        private readonly communityImageService: CommunityImagePort
    ){}
    private toListImageCommunityWithpagination(data:{
            data:SharedImageEntity[],
            currentPage:number,
            limit:number,
            hasMore: boolean
        }):ListPaginationDto<SharedImageEntity[]>{
            return {
                currentPage:data.currentPage,
                hasMore:data.hasMore,
                limit:data.limit,
                data:data.data
            }
        }
    async execute(page:number,limit:number):Promise<ListPaginationDto<SharedImageEntity[]>>{
        const imagesCommunity= await this.communityImageService.listSharedImages(page,limit)
        if (imagesCommunity.length === 0) {
            return this.toListImageCommunityWithpagination({
                currentPage: page,
                limit,
                hasMore: false, 
                data: []
            })
        }
        return this.toListImageCommunityWithpagination({
            currentPage: page,
            limit,
            hasMore: true,
            data:imagesCommunity
        })
    }
}