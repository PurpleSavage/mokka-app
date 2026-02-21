import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";
import { InfluencerEntity } from "../../domain/entities/influencer.entity";
import { FullGenerateInfluencerDto} from "../dtos/requests/generate-influencer.dto";
import { InfluencerSceneEntity } from "../../domain/entities/influencer-scene.entity";
import { InfluencerSnapshotEntity } from "../../domain/entities/influencer-snapshot.entity";

export interface InfluencersPort{
    generateInfluencers(dto:FullGenerateInfluencerDto):Promise<ResponseDataSocket<InfluencerEntity>>
    listInfluncers(user:string):Promise<InfluencerEntity[]>
    getInfluencerById(influencerId:string):Promise<InfluencerEntity>
    listScenesLastWeek(user:string): Promise<InfluencerSceneEntity[]>
    listSnapshotsLAstWeek(user:string):Promise<InfluencerSnapshotEntity[]>
    listHistorySnapshots(user:string,page?:number):Promise<InfluencerSnapshotEntity[]>
    listHistoryScenes(user:string,page?:number):Promise<InfluencerSceneEntity[]>
}