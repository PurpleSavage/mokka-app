import { InfluencersProfilePort } from "../ports/influencer-profile.port";

export class ListScenesByInfluencerIdUseCase{
    constructor(private readonly influencerProfileService: InfluencersProfilePort){}
    execute(influencer:string){
        return this.influencerProfileService.listScenesByInfluencers(influencer)
    }
    
}