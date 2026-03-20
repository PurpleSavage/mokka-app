import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { InfluencersProfilePort } from "../../application/ports/influencer-profile.port";
import { InfluencerSceneEntity } from "../../domain/entities/influencer-scene.entity";
import { InfluencerSnapshotEntity } from "../../domain/entities/influencer-snapshot.entity";
import { InfluencerEntity } from "../../domain/entities/influencer.entity";
import { toInfluencerEntity } from "../mappers/to-influencer-entity.mapper";
import { InfluencerResponseDto } from "../../application/dtos/responses/influencer-response.dto";
import axios from "axios";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";

export class InfluencerProfileApiService implements InfluencersProfilePort{
    constructor(private readonly httpService:HttpClientPort){}
     private handleError(error: unknown): never {
        if (axios.isAxiosError(error)) {
            throw new ApiErrorPlatform({
                message: error.response?.data?.message || 'An error occurred',
                errorType: error.response?.data?.errorType || ErrorPlatformMokka.MOKKA_ERROR,
                status: error.response?.status || 500,
                details: error.response?.data?.details
            })
        }
        throw error
    }
    async influencerInformation(influencerId: string): Promise<InfluencerEntity> {
        try {
            const response = await this.httpService.get<InfluencerResponseDto>(`/v1/influencer/read/model/${influencerId}`)
            return toInfluencerEntity(response)
        } catch (error) {
            this.handleError(error)
        }
    }
    listScenesByInfluencers(influencerId: string): Promise<InfluencerSceneEntity[]> {
        
    }
    listSnapshotsByInfluencers(influencerId: string): Promise<InfluencerSnapshotEntity[]> {
        
    }
}   