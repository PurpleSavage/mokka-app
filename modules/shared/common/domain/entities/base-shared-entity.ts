import { SharedByEntity } from "./shared-by.entity";

export interface BaseSahredEntity{
    id: string;
    remixes: number;
    downloads: number;
    sharedBy: SharedByEntity| string;
}