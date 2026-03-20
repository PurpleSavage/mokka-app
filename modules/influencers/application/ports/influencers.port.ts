import { InfluencerEntity } from "../../domain/entities/influencer.entity";
import { FullGenerateInfluencerDto} from "../dtos/requests/generate-influencer.dto";
import { InfluencerSceneEntity } from "../../domain/entities/influencer-scene.entity";
import { InfluencerSnapshotEntity } from "../../domain/entities/influencer-snapshot.entity";
import { ResponseHttpQueue } from "@/modules/shared/common/application/dtos/responses/response-http-queue.dto";

export interface InfluencersPort{
    generateInfluencers(dto:FullGenerateInfluencerDto):Promise<ResponseHttpQueue>
    listInfluncers(user:string):Promise<InfluencerEntity[]>
    listScenesLastWeek(user:string): Promise<InfluencerSceneEntity[]>
    listSnapshotsLAstWeek(user:string):Promise<InfluencerSnapshotEntity[]>
    listHistorySnapshots(user:string,page?:number):Promise<InfluencerSnapshotEntity[]>
    listHistoryScenes(user:string,page?:number):Promise<InfluencerSceneEntity[]>
}