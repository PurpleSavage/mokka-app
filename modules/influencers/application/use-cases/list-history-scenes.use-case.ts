import { InfluencersPort } from "../ports/influencers.port";

export class ListHistoryScenesUseCase{
    constructor(private readonly influencersService:InfluencersPort){}
    execute(user:string,page?:number){
        return this.influencersService.listHistoryScenes(user,page)
    }
}