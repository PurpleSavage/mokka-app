import Dexie, { type EntityTable } from 'dexie';

import { LocalModel3D } from '../render-3d/infrastructure/models/local-model-3d.model';



export type MokkaDatabase = Dexie & {
  models: EntityTable<LocalModel3D, 'id'>;
};

const db = new Dexie('MokkaAssetsDB') as MokkaDatabase;

db.version(1).stores({
  models: 'id, &slug, category, isDownloaded', // Tabla de modelos

});

export { db }; 