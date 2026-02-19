import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter"
import { GenerateInfluencerUseCase } from "../application/use-cases/generate-influencer.use-case"
import { InfluencerApiService } from "../infrastructure/api-adapters/influencers-api.service"
import { FullGenerateInfluencerDto } from "../application/dtos/requests/generate-influencer.dto"
import { ListInfluencersUseCase } from "../application/use-cases/list-influencers.use-case"
import { ListScenesLastWeekUseCase } from "../application/use-cases/list-scenes-last-week.use-case"
import { ListSnapshotsLastWeekUseCase } from "../application/use-cases/list-snapshots-last-week.use-case"

const influencersService= new InfluencerApiService(httpClient)
export const useCases = {
    generateInfluencer: new GenerateInfluencerUseCase(influencersService),
    listInfluencers: new ListInfluencersUseCase(influencersService),
    listScenesLastWeek: new ListScenesLastWeekUseCase(influencersService),
    listSnapshotsLastWeek: new ListSnapshotsLastWeekUseCase(influencersService) 
}
export const influencersDI= {
    generateInfluencer:(dto:FullGenerateInfluencerDto)=>useCases.generateInfluencer.execute(dto),
    listInfluencer: (userId:string)=>useCases.listInfluencers.execute(userId),
    listScenesLastWeek:(user:string)=>useCases.listScenesLastWeek.execute(user),
    listSnapshotsLastWeek:(user:string)=>useCases.listSnapshotsLastWeek.execute(user)
}