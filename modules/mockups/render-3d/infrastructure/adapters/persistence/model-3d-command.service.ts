import { MokkaDatabase } from "@/modules/mockups/config-db/db";
import { Model3DRepository } from "../../../domain/repositories/model-3d-command.port";
import { LocalModel3D } from "../../models/local-model-3d.model";

export class Model3DCommandService implements Model3DRepository{
    constructor(private readonly db:MokkaDatabase){}
    async saveModelsToLocal(models: LocalModel3D[]): Promise<void> {
        try {
            // bulkPut inserta o actualiza si el ID ya existe
            await this.db.models.bulkPut(models);
        } catch (error) {
            console.error("Error saving models to Dexie:", error);
            throw new Error("Failed to sync local database");
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
}