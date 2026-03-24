import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter"
import { InfluencerProfileApiService } from "../infrastructure/api-adapters/influencer-profile.service"
import { GetInfluencerByIdUseCase } from "../application/use-cases/get-influencer-by-id.use-case"
import { ListSnapshotsByInfluencerIdUseCase } from "../application/use-cases/list-snapshots-by-influencer-id.use-case"
import { ListScenesByInfluencerIdUseCase } from "../application/use-cases/list-scenes-by-influencer-id.use-case"

const influencerProfileService= new InfluencerProfileApiService(httpClient)
export const useCases = {
   getInfluencerProfile: new GetInfluencerByIdUseCase(influencerProfileService),
   lisSnapshotsByInfluencer: new ListSnapshotsByInfluencerIdUseCase(influencerProfileService),
   listScenesByInfluencer: new ListScenesByInfluencerIdUseCase(influencerProfileService)
}
export const influencerProfileDI= {
   getInfluencerProfile:(influencerId:string)=>useCases.getInfluencerProfile.execute(influencerId),
   lisSnapshotsByInfluencer:(influencerId:string)=>useCases.lisSnapshotsByInfluencer.execute(influencerId),
   listScenesByInfluencer:(influencerId:string)=>useCases.listScenesByInfluencer.execute(influencerId)
}