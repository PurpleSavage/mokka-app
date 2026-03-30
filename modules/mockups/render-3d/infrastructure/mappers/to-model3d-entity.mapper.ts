import { Model3DResponseDto } from "../../application/dtos/response/model-3d-response.dto";
import { Model3DEntity } from "../../domain/entities/model-3d.entity";
import { toNodeEntityMapper } from "./to-node-entity.mapper";




export function toModel3DEntityMapper(data: Model3DResponseDto): Model3DEntity {
   
    const objectModel:Model3DEntity={
        id: data.id,
        slug: data.slug,
        name: data.name,
        category: data.category,
        modelUrl: data.modelUrl,
        thumbnailUrl: data.thumbnailUrl,
        cameraSettings: data.cameraSettings,
        nodes:data.nodes.map(node=>toNodeEntityMapper(node)),
        createdAt: data.createdAt
    }
    if(data.status){
        objectModel['status']=data.status
    }
    return objectModel
}