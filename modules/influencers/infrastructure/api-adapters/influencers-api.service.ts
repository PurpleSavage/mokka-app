import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { InfluencersPort } from "../../application/ports/influencers.port";
import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";
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
    async listScenesLastWeek(user:string): Promise<InfluencerSceneEntity[]>{
        const response = await this.httpService.get<InfluencerScenesDto[]>(
            `/v1/influencer/read/last-scenes/${user}`
        )
        return response.map((scene)=>toSceneEntity(scene))
    }
    async listSnapshotsLAstWeek(user:string):Promise<InfluencerSnapshotEntity[]>{
        const response = await this.httpService.get<InfluencerSnapshotDto[]>(
            `/v1/influencer/read/last-snapshots/${user}`
        )
        return response.map((snapshot)=>toSnapshotEntity(snapshot))
    }

    async listHistoryScenes(user: string): Promise<InfluencerSceneEntity[]> {
        const response =await this.httpService.get<InfluencerScenesDto[]>(
            `/v1/influencer/read/scenes/${user}`
        )
        return response.map((scene)=>toSceneEntity(scene))
    }
    async listHistorySnapshots(user: string): Promise<InfluencerSnapshotEntity[]> {
        const response = await this.httpService.get<InfluencerSnapshotDto[]>(
            `/v1/influencer/read/snapshots/${user}`
        )
        return response.map((snapshot)=>toSnapshotEntity(snapshot))
    }
}