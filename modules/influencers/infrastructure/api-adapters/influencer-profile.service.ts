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
import { InfluencerScenesDto } from "../../application/dtos/responses/influencer-scenes.dto";
import { InfluencerSnapshotDto } from "../../application/dtos/responses/influencer-snapshot.dto";
import { toSceneEntity } from "../mappers/to-scene-entity.mapper";
import { toSnapshotEntity } from "../mappers/to-snapshot-entity.mapper";

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
            const response = await this.httpService.get<InfluencerResponseDto>(`/v1/influencers/read/model/${influencerId}`)
            return toInfluencerEntity(response)
        } catch (error) {
            this.handleError(error)
        }
    }
    async listScenesByInfluencers(influencerId: string): Promise<InfluencerSceneEntity[]> {
        try {
            const response = await this.httpService.get<InfluencerScenesDto[]>(`/v1/influencers/read/influencer/scenes/${influencerId}`)
            return response.map(toSceneEntity)
        } catch (error) {
            this.handleError(error)
        }
    }
    async listSnapshotsByInfluencers(influencerId: string): Promise<InfluencerSnapshotEntity[]> {
        try {
            const response = await this.httpService.get<InfluencerSnapshotDto[]>(`/v1/influencer/read/influencer/snapshots/${influencerId}`)
             return response.map(toSnapshotEntity)
        } catch (error) {
            this.handleError(error)
        }
    }
}   