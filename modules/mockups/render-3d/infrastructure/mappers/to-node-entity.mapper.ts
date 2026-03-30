import { ModelNodeResponse } from "../../application/dtos/response/model-node-response.dto"
import { ModelNodeEntity } from "../../domain/entities/model-node.entity"

export function toNodeEntityMapper(node: ModelNodeResponse): ModelNodeEntity{
    const objectNode:ModelNodeEntity={
        id: node.id,
        nameMesh: node.nameMesh,
        label: node.label, 
        isEditable: node.isEditable,
        materialDefault: node.materialDefault,
        transform: node.transform,

    }
    if(node.decalConfig){
        objectNode['decalConfig']=node.decalConfig
    }
    return objectNode
}