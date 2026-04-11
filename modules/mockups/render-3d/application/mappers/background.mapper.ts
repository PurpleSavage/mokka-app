import { BackgroundMockupEntity } from "../../domain/entities/background-mockup.entity";
import { LocalBackgroundMockup } from "../../infrastructure/models/local-background-mockup.model";

export class BackgroundMapper{
    static toEntityList(data:LocalBackgroundMockup[]):BackgroundMockupEntity[]{
        return data.map((localBackground)=>{
            return {
                id:localBackground.id,
                backgroundUrl:localBackground.backgroundUrl,
                name:localBackground.name,
                createdAt:localBackground.createdAt
            }
        })
    }
    static toModelList(data:BackgroundMockupEntity[]):LocalBackgroundMockup[]{
        return data.map((background) => ({
            localUpdatedAt: new Date(),  // 👈 new Date() en vez de Date.now()
            lastAccessAt: null,
            id: background.id,
            backgroundUrl: background.backgroundUrl,
            name: background.name,
            createdAt: background.createdAt
        }))
    }
}