import { InfluencersPort } from "../ports/influencers.port";

export class ListInfluencersUseCase{
    constructor(private readonly influencerService: InfluencersPort){}
    execute(userId:string){
        return this.influencerService.listInfluncers(userId)
    }
}