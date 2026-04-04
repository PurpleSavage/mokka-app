
import { Model3DRepository } from "../../domain/repositories/model-3d-command.port";
import { MockupCreatedVO } from "../../domain/value-objects/mockup-created.vo";
import { SaveMockupDto } from "../dtos/request/save-mockup.dto";

export class SaveMockupGeneratedUseCase{
    constructor(
        private readonly render3DCommandService: Model3DRepository
    ){}
    async execute(data:SaveMockupDto):Promise<void>{
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