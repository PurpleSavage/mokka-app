import { InfluencersProfilePort } from "../ports/influencer-profile.port";

export class ListSnapshotsByInfluencerIdUseCase{
    constructor(private readonly influencerProfileService: InfluencersProfilePort){}
    execute(influencer:string){
        return this.influencerProfileService.listSnapshotsByInfluencers(influencer)
    }
}