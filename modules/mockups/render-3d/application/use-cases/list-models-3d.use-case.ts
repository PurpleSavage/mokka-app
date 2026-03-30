import { Render3DPort } from "../ports/api/render-3d.port";

export class ListModels3dUseCase{
    constructor(private readonly render3DService: Render3DPort){}
    execute(){
        return this.render3DService.listModels();
    }
}
