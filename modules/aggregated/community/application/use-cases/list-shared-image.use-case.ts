import { CommunityImagePort } from "../ports/community-image.port";

export class ListSharedImageUseCase{
    constructor(
        private readonly communityImageService: CommunityImagePort
    ){}
    execute(page:number,limit:number){
        return this.communityImageService.listSharedImages(page,limit)
    }
}