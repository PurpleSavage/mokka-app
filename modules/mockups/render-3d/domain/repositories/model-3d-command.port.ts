import { LocalModel3D } from "../../infrastructure/models/local-model-3d.model";
import { MockupCreatedVO } from "../value-objects/mockup-created.vo";

export interface Model3DRepository{
    saveModelsToLocal(models: LocalModel3D[]): Promise<void>;
    listModelsFromLocal(): Promise<LocalModel3D[]>;
    saveMockupCreated(vo:MockupCreatedVO):Promise<void>
}