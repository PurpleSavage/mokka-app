import { StatusModelType } from "../enums/status-model";
import { ModelNodeEntity } from "./model-node.entity";

export interface Model3DEntity{
    id: string;
    slug: string;
    name: string;
    category: string;
    status?: StatusModelType;
    modelUrl: string;
    thumbnailUrl: string;
    cameraSettings: { position: number[]; target: number[]; fov: number };
    nodes: ModelNodeEntity[]; 
    createdAt:string;
}