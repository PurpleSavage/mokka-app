import { Model3DRepository } from "../../domain/repositories/model-3d-command.port";
import { EntityToModelMapper } from "../mappers/entity-to-model";
import { ModelToEntityMapper } from "../mappers/model-to-entity";
import { Render3DPort } from "../ports/api/render-3d.port";

export class ListModels3dUseCase{
    constructor(
        private readonly render3DService: Render3DPort,
        private readonly render3DCommandService: Model3DRepository
    ){}
    async execute(){
        const listModelsFromLocal= await this.render3DCommandService.listModelsFromLocal()
        if(listModelsFromLocal.length>0){
            return ModelToEntityMapper.toEntityList(listModelsFromLocal);
        }
        const model= await this.render3DService.listModels();

        const listModelsToLocal= EntityToModelMapper.toModelList(model);

        await this.render3DCommandService.saveModelsToLocal(listModelsToLocal);
        
        return model;
    }
}
