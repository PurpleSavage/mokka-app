import Dexie, { type EntityTable } from 'dexie';

import { LocalModel3D } from '../render-3d/infrastructure/models/local-model-3d.model';
import { MockupCreatedModel } from '../render-3d/infrastructure/models/mockup-created.model';
import { LocalBackgroundMockup } from '../render-3d/infrastructure/models/local-background-mockup.model';



export type MokkaDatabase = Dexie & {
  models: EntityTable<LocalModel3D, 'id'>;
  mockups:EntityTable<MockupCreatedModel>;
  backgrounds:EntityTable<LocalBackgroundMockup,'id'>
};

const db = new Dexie('MokkaAssetsDB') as MokkaDatabase;

db.version(1).stores({
  models: 'id, &slug, category', // Tabla de modelos
  mockups:'++id, lastUpdatedAt',
   backgrounds:'id, lastUpdatedA,createdAt',
});

export { db }; 