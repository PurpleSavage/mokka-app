import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter";
import { ListModels3dUseCase } from "../application/use-cases/list-models-3d.use-case";
import { Render3DService } from "../infrastructure/adapters/api/render-3d.service";

const  serviceRender3D= new Render3DService(httpClient)
const useCases = {
    listModels3D: new ListModels3dUseCase(serviceRender3D)
}


export const render3DDI = {
    listModels3D:()=>useCases.listModels3D.execute()
}