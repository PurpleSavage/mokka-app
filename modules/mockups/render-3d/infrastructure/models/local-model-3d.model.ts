import { Model3DEntity } from "../../domain/entities/model-3d.entity";

export interface LocalModel3D extends Model3DEntity {
  fileBlob?: Blob | null;  // El binario del .glb
  localUpdatedAt?: number; // para saber cuándo se guardó en el PC
  isDownloaded: boolean;
  lastAccessAt: number;
}