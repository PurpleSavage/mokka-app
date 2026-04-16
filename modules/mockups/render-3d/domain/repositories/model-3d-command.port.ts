import { LocalBackgroundMockup } from "../../infrastructure/models/local-background-mockup.model";
import { LocalModel3D } from "../../infrastructure/models/local-model-3d.model";
import { MockupCreatedVO } from "../value-objects/mockup-created.vo";

export interface Model3DRepository{
    saveModelsToLocal(models: LocalModel3D[]): Promise<void>;
    listModelsFromLocal(page: number, limit: number ): Promise<LocalModel3D[]>;
    saveMockupCreated(vo:MockupCreatedVO):Promise<void>
    saveBackgroundsMockupToLocal(backgrounds:LocalBackgroundMockup[]):Promise<void>
    listBackgroundsToLocal(page: number, limit: number ):Promise<LocalBackgroundMockup[]>
    countTotalData(tableName:string):Promise<number>
}