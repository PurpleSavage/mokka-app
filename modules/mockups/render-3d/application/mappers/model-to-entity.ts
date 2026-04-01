import { Model3DEntity } from "../../domain/entities/model-3d.entity";
import { LocalModel3D } from "../../infrastructure/models/local-model-3d.model";

export class ModelToEntityMapper{
    static toEntityList(data:LocalModel3D[]): Model3DEntity[] {
        return data.map((item) =>{
            return {
                id: item.id,
                slug: item.slug,
                name: item.name,
                category: item.category,
                status: item.status,
                modelUrl: item.modelUrl,
                thumbnailUrl: item.thumbnailUrl,
                cameraSettings: { position: item.cameraSettings.position, target: item.cameraSettings.target, fov: item.cameraSettings.fov },
                nodes: item.nodes,
                createdAt:item.createdAt
            }
        } );
    }
}