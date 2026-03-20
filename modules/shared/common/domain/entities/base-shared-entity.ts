import { SharedByEntity } from "./shared-by.entity";

export interface BaseSharedEntity{
    id: string;
    remixes: number;
    downloads: number;
    sharedBy: SharedByEntity
}