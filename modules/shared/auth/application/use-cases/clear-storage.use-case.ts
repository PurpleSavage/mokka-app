import { StorageStrategyPort } from "@/modules/shared/common/application/ports/storage-strategy.port";

export class ClearStorageUseCase{
    constructor(private readonly localStorageService:StorageStrategyPort){}
    execute(){
        this.localStorageService.remove('session_token')
        this.localStorageService.remove('id_session')
        this.localStorageService.remove('email_session')
    }
}