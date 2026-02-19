import { InfluencerSnapshotDto } from "../../application/dtos/responses/influencer-snapshot.dto";
import { InfluencerSnapshotEntity } from "../../domain/entities/influencer-snapshot.entity";

export function toSnapshotEntity(data:InfluencerSnapshotDto):InfluencerSnapshotEntity{

    return {
        influencer:data.influencer,
        snapshotUrl:data.snapshotUrl,
        prompt:data.prompt,
        enviroment:data.enviroment,
        outfitStyle:data.outfitStyle,
        createdAt:data.createdAt,
        id:data.id
    }
}