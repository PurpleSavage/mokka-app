import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter"
import { InfluencerProfileApiService } from "../infrastructure/api-adapters/influencer-profile.service"
import { GetInfluencerByIdUseCase } from "../application/use-cases/get-influencer-by-id.use-case"

const influencerProfileService= new InfluencerProfileApiService(httpClient)
export const useCases = {
   getInfluencerProfile: new GetInfluencerByIdUseCase(influencerProfileService)
}
export const influencerProfileDI= {
   getInfluencerProfile:(influencerId:string)=>useCases.getInfluencerProfile.execute(influencerId) 
}