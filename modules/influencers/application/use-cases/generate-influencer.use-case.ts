import { FullGenerateInfluencerDto } from "../dtos/requests/generate-influencer.dto";
import { InfluencersPort } from "../ports/influencers.port";

export class GenerateInfluencerUseCase{
    constructor(private readonly influencerService: InfluencersPort){}
    execute(dto:FullGenerateInfluencerDto){
        return this.influencerService.generateInfluencers(dto)
    }
}