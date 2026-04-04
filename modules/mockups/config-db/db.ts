import Dexie, { type EntityTable } from 'dexie';

import { LocalModel3D } from '../render-3d/infrastructure/models/local-model-3d.model';
import { MockupCreatedModel } from '../render-3d/infrastructure/models/mockup-created.model';



export type MokkaDatabase = Dexie & {
  models: EntityTable<LocalModel3D, 'id'>;
  mockups:EntityTable<MockupCreatedModel>
};

const db = new Dexie('MokkaAssetsDB') as MokkaDatabase;

db.version(1).stores({
  models: 'id, &slug, category', // Tabla de modelos
  mockups:'++id, lastUpdatedAt'

});

export { db }; 