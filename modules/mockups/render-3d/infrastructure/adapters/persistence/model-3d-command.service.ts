import { MokkaDatabase } from "@/modules/mockups/config-db/db";
import { Model3DRepository } from "../../../domain/repositories/model-3d-command.port";
import { LocalModel3D } from "../../models/local-model-3d.model";
import { MockupCreatedVO } from "../../../domain/value-objects/mockup-created.vo";
import { Mockups3DError } from "../../errors/mockups-3d.error";
import { LocalBdErrors, LocalBdErrorsType } from "../../../domain/enums/local-bd-errors";


export class Model3DCommandService implements Model3DRepository{
    constructor(private readonly db:MokkaDatabase){}
    private hanleError(data:{
        details:string,
        message:string,
        errorType:LocalBdErrorsType,
        status:number
    }){
        throw new Mockups3DError({
            message: data.message,
            errorType:data.errorType,
            status: data.status,
            details:  data.details,
        })
    }
    async saveModelsToLocal(models: LocalModel3D[]): Promise<void> {
        try {
            // bulkPut inserta o actualiza si el ID ya existe
            await this.db.models.bulkPut(models);
        } catch (error) {
            if(error instanceof Error){
                const err= {
                    message:'Failed',
                    errorType:LocalBdErrors.FAILED_SAVE,
                    status:500,
                    details:error.cause
                }
                console.error("Error saving models to Dexie:", err)
            }
        }
    }
    async listModelsFromLocal(): Promise<LocalModel3D[]> {
        try {
            return await this.db.models.toArray();
        } catch (error) {
            console.error("Error listing models from Dexie:", error);
            return [];
        }
    }
    async saveMockupCreated(vo:MockupCreatedVO): Promise<void> {
        try {
            await this.db.mockups.add({
                localUpdatedAt: vo.localUpdatedAt,
                decalFile:vo.decalFile,
                lastUpdatedAt:vo.lastUpdatedAt,
                modelId:vo.modelId,
                backgroundColor:vo.backgroundColor,
                color:vo.color,
            })
        } catch (error) {
            console.error("Error saving models to Dexie:", error);
            this.hanleError({
                message:'Failed to save mockup',
                errorType:LocalBdErrors.FAILED_SAVE,
                status:500,
                details:'It appears that an error occurred while saving your generated model locally; you may not have enough space on this device.'
            })
        }
    }
}