import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto";
import { Model3DRepository } from "../../domain/repositories/model-3d-command.port";
import { EntityToModelMapper } from "../mappers/entity-to-model";
import { ModelToEntityMapper } from "../mappers/model-to-entity";
import { Render3DPort } from "../ports/api/render-3d.port";
import { Model3DEntity } from "../../domain/entities/model-3d.entity";

export class ListModels3dUseCase{
    constructor(
        private readonly render3DService: Render3DPort,
        private readonly render3DCommandService: Model3DRepository
    ){}
    private toListModelsWithpagination(data:{
            data: Model3DEntity[],
            currentPage:number,
            limit:number,
            hasMore: boolean
    }):ListPaginationDto<Model3DEntity[]>{
        return {
            currentPage:data.currentPage,
            hasMore:data.hasMore,
            limit:data.limit,
            data:data.data
        }
     }
    async execute(page:number,limit:number){
        const listModelsFromLocal= await this.render3DCommandService.listModelsFromLocal(page,limit)
        if(listModelsFromLocal.length>0){
            return this.toListModelsWithpagination({
                currentPage: page,
                limit,
                hasMore: listModelsFromLocal.length === limit, 
                data: ModelToEntityMapper.toEntityList(listModelsFromLocal)
            })
            
        }
        const models= await this.render3DService.listModels(page,limit);

        if(models.length===0){
            return this.toListModelsWithpagination({
                currentPage: page,
                limit,
                hasMore: false, 
                data: []
            })
        
        }

        const listModelsToLocal= EntityToModelMapper.toModelList(models);

        await this.render3DCommandService.saveModelsToLocal(listModelsToLocal);
        
        return  this.toListModelsWithpagination({
            currentPage: page,
            limit,
            hasMore:models.length ===  limit,
            data:models
        })
    }
}
