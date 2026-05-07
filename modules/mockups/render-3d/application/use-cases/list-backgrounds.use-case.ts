import { ListPaginationDto } from "@/modules/shared/common/application/dtos/responses/list-pagination.dto";
import { Model3DRepository } from "../../domain/repositories/model-3d-command.port";
import { BackgroundMapper } from "../mappers/background.mapper";
import { Render3DPort } from "../ports/api/render-3d.port";
import { BackgroundMockupEntity } from "../../domain/entities/background-mockup.entity";

export class ListBackgroundsMockupsUseCase{
    constructor(
        private readonly render3DService: Render3DPort,
        private readonly render3DCommandService: Model3DRepository
    ){}

    private toListBackgroundsWithpagination(data:{
        data:BackgroundMockupEntity[],
        currentPage:number,
        limit:number,
        hasMore: boolean
    }):ListPaginationDto<BackgroundMockupEntity[]>{
        return {
            currentPage:data.currentPage,
            hasMore:data.hasMore,
            limit:data.limit,
            data:data.data
        }
    }

    async execute(page: number, limit: number){
       
        const backgroundsFromLocal= await this.render3DCommandService.listBackgroundsToLocal(page,limit)
         
       
        if (backgroundsFromLocal.length > 0) {
             
            return this.toListBackgroundsWithpagination({
                currentPage: page,
                limit,
                hasMore: backgroundsFromLocal.length === limit, 
                data: BackgroundMapper.toEntityList(backgroundsFromLocal)
            })
           
        }
        
        const backgrounds = await this.render3DService.listbackgrounds(page,limit)
    
        if (backgrounds.length === 0) {
            return this.toListBackgroundsWithpagination({
                currentPage: page,
                limit,
                hasMore: false, 
                data: []
            })
        }

        const backgroundsLocal= BackgroundMapper.toModelList(backgrounds);
        
        await this.render3DCommandService.saveBackgroundsMockupToLocal(backgroundsLocal);
        
        return this.toListBackgroundsWithpagination({
            currentPage: page,
            limit,
            hasMore: backgrounds.length === limit, 
            data: backgrounds
        })
        
    }
}