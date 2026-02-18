import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { InfluencersPort } from "../../application/ports/influencers.port";
import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";
import { InfluencerEntity } from "../../domain/entities/influencer.entity";
import { FullGenerateInfluencerDto } from "../../application/dtos/requests/generate-influencer.dto";
import { InfluencerResponseDto } from "../../application/dtos/responses/influencer-response.dto";
import { toInfluencerEntity } from "../mappers/to-influencer-entity.mapper";

export class InfluencerApiService implements InfluencersPort{
    constructor(private readonly httpService:HttpClientPort){}
    async generateInfluencers(dto:FullGenerateInfluencerDto): Promise<ResponseDataSocket<InfluencerEntity>> {
        const response = await this.httpService.post<ResponseDataSocket<InfluencerEntity>>(
            '/v1/influencer/write/model',
            dto
        )
        return response
    }
    async listInfluncers(user:string):Promise<InfluencerEntity[]>{
        const response = await this.httpService.get<InfluencerResponseDto[]>(
            `/v1/influencer/read/models/${user}`
        )
        return response.map((influencer)=>toInfluencerEntity(influencer))
    }
    async getInfluencerById(influencerId: string): Promise<InfluencerEntity> {
        const response = await this.httpService.get<InfluencerResponseDto>(
            `/v1/influencer/read/model/${influencerId}`
        )
        return toInfluencerEntity(response)
    }
}