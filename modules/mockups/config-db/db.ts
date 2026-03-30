import Dexie, { type EntityTable } from 'dexie';

import { LocalModel3D } from '../render-3d/infrastructure/models/local-model-3d.model';


const db = new Dexie('MokkaAssetsDB') as Dexie & {
  models: EntityTable<LocalModel3D, 'id'>;

};

db.version(1).stores({
  models: 'id, &slug, category, isDownloaded', // Tabla de modelos

});

export { db }; 