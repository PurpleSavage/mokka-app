import { InfluencersPort } from "../ports/influencers.port";

export class ListSnapshotsLastWeekUseCase{
    constructor(private readonly influencersService:InfluencersPort){}
    execute(user:string){
        return this.influencersService.listSnapshotsLAstWeek(user)
    }
}