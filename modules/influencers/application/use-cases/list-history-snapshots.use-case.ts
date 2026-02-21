import { InfluencersPort } from "../ports/influencers.port";

export class ListHistorySnapshotsUseCase{
    constructor(private readonly influencersService:InfluencersPort){}
    execute(user:string,page?:number){
        return this.influencersService.listHistorySnapshots(user,page)
    }
}