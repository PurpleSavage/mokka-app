import { Model3DEntity } from "../../../domain/entities/model-3d.entity";

export interface Render3DPort {
    listModels():Promise<Model3DEntity[]>
}