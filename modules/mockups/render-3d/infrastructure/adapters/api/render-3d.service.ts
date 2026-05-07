import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port"
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error"
import axios from "axios"
import { Render3DPort } from "../../../application/ports/api/render-3d.port"
import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types"
import { Model3DResponseDto } from "../../../application/dtos/response/model-3d-response.dto"
import { toModel3DEntityMapper } from "../../mappers/to-model3d-entity.mapper"
import { Model3DEntity } from "../../../domain/entities/model-3d.entity"
import { BackgroundMockupEntity } from "../../../domain/entities/background-mockup.entity"
import { BackgroundMockupResponseDto } from "../../../application/dtos/response/background-mockup-response.dto"
import { toBackgroundEntity } from "../../mappers/to-background-entity.mapper"


export class Render3DService implements Render3DPort {
    constructor(
        private readonly httpService:HttpClientPort
    ){}
    private handleError(error: unknown): never {
        if (axios.isAxiosError(error)) {
            throw new ApiErrorPlatform({
                message: error.response?.data?.message || 'An error occurred',
                errorType: error.response?.data?.errorType || ErrorPlatformMokka.MOKKA_ERROR,
                status: error.response?.status || 500,
                details: error.response?.data?.details
            })
        }
        throw error
    } 
    async listModels(page:number,limit:number): Promise<Model3DEntity[]> {
        try {
            const params = new URLSearchParams()
            if(page !== undefined) params.append('page',page.toString())
            if(limit !== undefined) params.append('limit',limit.toString()) 
            const response =await this.httpService.get<Model3DResponseDto[]>(`/v1/3d/read/all?${params}`) 
            return response.map((model)=>toModel3DEntityMapper(model))
        } catch (error) {
            this.handleError(error)
        }
    }
    async listbackgrounds(page:number,limit:number): Promise<BackgroundMockupEntity[]> {
        try {
            const params = new URLSearchParams()
            if(page !== undefined) params.append('page',page.toString())
            if(limit !== undefined) params.append('limit',limit.toString())    
            const response = await this.httpService.get<BackgroundMockupResponseDto[]>(`/v1/3d/read/backgrounds?${params}`)
            return response.map((background)=>toBackgroundEntity(background))
        } catch (error) {
            this.handleError(error)
        }
    }

}