import { InfluencersPort } from "../ports/influencers.port";

export class ListScenesLastWeekUseCase{
    constructor(private readonly influencersService:InfluencersPort){}
    execute(user:string){
        return this.influencersService.listScenesLastWeek(user)
    }
}