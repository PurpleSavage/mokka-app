import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { InfluencersPort } from "../../application/ports/influencers.port";

import { InfluencerEntity } from "../../domain/entities/influencer.entity";
import { FullGenerateInfluencerDto } from "../../application/dtos/requests/generate-influencer.dto";
import { InfluencerResponseDto } from "../../application/dtos/responses/influencer-response.dto";
import { toInfluencerEntity } from "../mappers/to-influencer-entity.mapper";
import { InfluencerSceneEntity } from "../../domain/entities/influencer-scene.entity";
import { InfluencerSnapshotEntity } from "../../domain/entities/influencer-snapshot.entity";
import { InfluencerSnapshotDto } from "../../application/dtos/responses/influencer-snapshot.dto";
import { toSnapshotEntity } from "../mappers/to-snapshot-entity.mapper";
import { InfluencerScenesDto } from "../../application/dtos/responses/influencer-scenes.dto";
import { toSceneEntity } from "../mappers/to-scene-entity.mapper";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import axios from "axios";
import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";

export class InfluencerApiService implements InfluencersPort{
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

    async generateInfluencers(dto: FullGenerateInfluencerDto): Promise<ResponseHttpQueue> {
        try {
            return await this.httpService.post<ResponseHttpQueue>('/v1/influencer/write/model', dto)
        } catch (error) {
            this.handleError(error)
        }
    }

    async listInfluncers(user: string): Promise<InfluencerEntity[]> {
        try {
            const response = await this.httpService.get<InfluencerResponseDto[]>(`/v1/influencer/read/models/${user}`)
          
            return response.map(toInfluencerEntity)
        } catch (error) {
            this.handleError(error)
        }
    }

    async listScenesLastWeek(user: string): Promise<InfluencerSceneEntity[]> {
        try {
            const response = await this.httpService.get<InfluencerScenesDto[]>(`/v1/influencer/read/last-scenes/${user}`)
            return response.map(toSceneEntity)
        } catch (error) {
            this.handleError(error)
        }
    }

    async listSnapshotsLAstWeek(user: string): Promise<InfluencerSnapshotEntity[]> {
        try {
            const response = await this.httpService.get<InfluencerSnapshotDto[]>(`/v1/influencer/read/last-snapshots/${user}`)
            return response.map(toSnapshotEntity)
        } catch (error) {
            this.handleError(error)
        }
    }

    async listHistoryScenes(user: string, page?: number): Promise<InfluencerSceneEntity[]> {
        try {
            const params = new URLSearchParams({ userId: user })
            if (page) params.append('page', page.toString())
            const response = await this.httpService.get<InfluencerScenesDto[]>(`/v1/influencer/read/scenes?${params}`)
            return response.map(toSceneEntity)
        } catch (error) {
            this.handleError(error)
        }
    }

    async listHistorySnapshots(user: string, page?: number): Promise<InfluencerSnapshotEntity[]> {
        try {
            const params = new URLSearchParams({ userId: user })
            if (page) params.append('page', page.toString())
            const response = await this.httpService.get<InfluencerSnapshotDto[]>(`/v1/influencer/read/snapshots?${params}`)
            return response.map(toSnapshotEntity)
        } catch (error) {
            this.handleError(error)
        }
    }

    

    async listScenesByInfluencer(){

    }
}