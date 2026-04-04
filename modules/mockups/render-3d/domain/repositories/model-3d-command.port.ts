import { LocalModel3D } from "../../infrastructure/models/local-model-3d.model";

export interface Model3DRepository{
    saveModelsToLocal(models: LocalModel3D[]): Promise<void>;
    listModelsFromLocal(): Promise<LocalModel3D[]>;
}