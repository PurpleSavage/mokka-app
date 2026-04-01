import { Model3DEntity } from "../../domain/entities/model-3d.entity";
import { LocalModel3D } from "../../infrastructure/models/local-model-3d.model";

export class EntityToModelMapper{
    static toModelList(data:Model3DEntity[]): LocalModel3D[] {
        const currentDate = Date.now();
        return data.map((item)=>{
            return {
                id: item.id,
                slug: item.slug,
                name: item.name,
                category: item.category,
                status: item.status,
                modelUrl: item.modelUrl,
                thumbnailUrl: item.thumbnailUrl,
                cameraSettings: item.cameraSettings,
                nodes:item.nodes,
                createdAt:item.createdAt,
                localUpdatedAt: new Date(currentDate),
                lastAccessAt: null

            }
        })  
    }
}