import { InfluencerSceneEntity } from "../../domain/entities/influencer-scene.entity";
import { InfluencerSnapshotEntity } from "../../domain/entities/influencer-snapshot.entity";
import { InfluencerEntity } from "../../domain/entities/influencer.entity";

export interface InfluencersProfilePort{
    influencerInformation(influencerId:string):Promise<InfluencerEntity>
    listScenesByInfluencers(influencerId:string):Promise<InfluencerSceneEntity[]>
    listSnapshotsByInfluencers(influencerId:string):Promise<InfluencerSnapshotEntity[]>
}