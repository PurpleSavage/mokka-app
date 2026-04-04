import { Model3DEntity } from "../../domain/entities/model-3d.entity";

export interface LocalModel3D extends Model3DEntity {
  localUpdatedAt: Date; // para saber cuándo se guardó en el PC
  lastAccessAt: Date | null;
}