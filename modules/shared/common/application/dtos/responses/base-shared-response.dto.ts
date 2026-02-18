import { SharedByResponseDto } from "./shared-by-response.dto";

export interface BaseSharedResponseDto{
    id: string;
    remixes: number;
    downloads: number;
    sharedBy: SharedByResponseDto| string;
}