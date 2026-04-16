import { StatusModelType } from "../../../domain/enums/status-model";
import { ModelNodeResponse } from "./model-node-response.dto";

export interface Model3DResponseDto{
    id: string;
    slug: string;
    name: string;
    category: string;
    status?: StatusModelType;
    modelUrl: string;
    thumbnailUrl: string;
    cameraSettings: { 
        position: [number,number,number]; 
        target: [number,number,number]; 
        fov: number 
    };
    nodes: ModelNodeResponse[]; 
    createdAt:string;
}