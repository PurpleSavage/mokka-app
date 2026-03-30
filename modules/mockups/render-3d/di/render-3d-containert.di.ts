import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { Render3DPort } from "../application/ports/api/render-3d.port";
import axios from "axios";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";
import { Model3DResponseDto } from "../application/dtos/response/model-3d-response.dto";
import { Model3DEntity } from "../domain/entities/model-3d.entity";
import { toModel3DEntityMapper } from "../infrastructure/mappers/to-model3d-entity.mapper";

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
    async listModels(): Promise<Model3DEntity[]> {
        try {
            const response =await this.httpService.get<Model3DResponseDto[]>('/v1/3d/read/all') 
            return response.map((model)=>toModel3DEntityMapper(model))
        } catch (error) {
            this.handleError(error)
        }
    }
}