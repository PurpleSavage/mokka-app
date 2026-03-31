import { Render3DPort } from "../ports/api/render-3d.port";

export class ListModels3dUseCase{
    constructor(private readonly render3DService: Render3DPort){}
    async execute(){
        const model= await this.render3DService.listModels();
         console.log('models 3d',model)
        return model;
    }
}
