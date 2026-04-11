import { httpClient } from "@/modules/shared/common/infrastructure/adapters/http-service.adapter";
import { ListModels3dUseCase } from "../application/use-cases/list-models-3d.use-case";
import { Render3DService } from "../infrastructure/adapters/api/render-3d.service";
import { db } from "../../config-db/db";
import { Model3DCommandService } from "../infrastructure/adapters/persistence/model-3d-command.service";
import { SaveMockupGeneratedUseCase } from "../application/use-cases/save-mockup-generated.use-case";
import { ConfigMockupLoadedDto } from "../application/dtos/request/config-mockup-loaded.dto";
import { ListBackgroundsMockupsUseCase } from "../application/use-cases/list-backgrounds.use-case";

const  serviceRender3D= new Render3DService(httpClient)
const render3DCommandService=  new Model3DCommandService(db)
const useCases = {
    listModels3D: new ListModels3dUseCase(serviceRender3D,render3DCommandService),
    saveMockup3D: new SaveMockupGeneratedUseCase(render3DCommandService),
    listBackgrounds: new ListBackgroundsMockupsUseCase(serviceRender3D,render3DCommandService)
}


export const render3DDI = {
    listModels3D:(page:number=1,limit:number=6)=>useCases.listModels3D.execute(page,limit),
    saveMockup3D:(data:ConfigMockupLoadedDto)=>useCases.saveMockup3D.execute(data),
    listBackgrounds:(page:number=1,limit:number=6)=>useCases.listBackgrounds.execute(page,limit)
}