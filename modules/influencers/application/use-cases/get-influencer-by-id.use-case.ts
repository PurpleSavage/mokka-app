import type { InfluencersProfilePort } from "../ports/influencer-profile.port";


export class GetInfluencerByIdUseCase{
    constructor(private readonly influencerProfileService: InfluencersProfilePort){}
    execute(influencerId:string){
        return this.influencerProfileService.influencerInformation(influencerId)
    }
}