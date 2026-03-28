import { StorageStrategyPort } from "@/modules/shared/common/application/ports/storage-strategy.port";

export class ClearStorageUseCase{
    constructor(private readonly localStorageService:StorageStrategyPort){}
    execute(){
        this.localStorageService.remove('id_session')
    }
}