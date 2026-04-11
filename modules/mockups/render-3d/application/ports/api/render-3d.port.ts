import { BackgroundMockupEntity } from "../../../domain/entities/background-mockup.entity";
import { Model3DEntity } from "../../../domain/entities/model-3d.entity";

export interface Render3DPort {
    listModels(page:number,limit:number):Promise<Model3DEntity[]>
    listbackgrounds(page:number,limit:number):Promise<BackgroundMockupEntity[]>
    
}