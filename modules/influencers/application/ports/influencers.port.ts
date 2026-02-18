import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";
import { InfluencerEntity } from "../../domain/entities/influencer.entity";
import { FullGenerateInfluencerDto} from "../dtos/requests/generate-influencer.dto";

export interface InfluencersPort{
    generateInfluencers(dto:FullGenerateInfluencerDto):Promise<ResponseDataSocket<InfluencerEntity>>
    listInfluncers(user:string):Promise<InfluencerEntity[]>
    getInfluencerById(influencerId:string):Promise<InfluencerEntity>
}