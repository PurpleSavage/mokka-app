import { StorageStrategyPort } from "@/modules/shared/common/application/ports/storage-strategy.port";

export class GetLocalSesssionUseCase{
    constructor(private readonly localStorageService:StorageStrategyPort){}
    execute():string | null{
        return this.localStorageService.get<string>('id_session')
    }
}