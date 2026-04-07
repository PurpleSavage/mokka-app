
import { Model3DRepository } from "../../domain/repositories/model-3d-command.port";
import { MockupCreatedVO } from "../../domain/value-objects/mockup-created.vo";
import { ConfigMockupLoadedDto } from "../dtos/request/config-mockup-loaded.dto";


export class SaveMockupGeneratedUseCase{
    constructor(
        private readonly render3DCommandService: Model3DRepository
    ){}
    async execute(data:ConfigMockupLoadedDto):Promise<void>{
        const date = new Date()
        const vo = MockupCreatedVO.createVO({
            localUpdatedAt:date,
            decalFile:data.decalFile,
            lastUpdatedAt:date,
            modelId:data.modelId,
            backgroundColor:data.backgroundColor,
            color:data.color,
        })
        await this.render3DCommandService.saveMockupCreated(vo)
    }
}