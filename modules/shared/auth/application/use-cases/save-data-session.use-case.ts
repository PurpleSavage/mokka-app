import { StorageStrategyPort } from "@/modules/shared/common/application/ports/storage-strategy.port";
import { SessionEntity } from "../../domain/entities/session.entity";
import { AuthTokenCache } from "@/modules/shared/common/infrastructure/services/auth-token-cache.service";



export class SaveDataSession {
    constructor(
        private readonly localStorageService:StorageStrategyPort,
        
    ){}
    execute(session:SessionEntity){
        try {
            this.localStorageService.set('id_session',session.user.id)
            this.localStorageService.set('email_session',session.user.email)
            AuthTokenCache.setToken(session.accessToken)
        } catch (error) {
            throw error
        }
    }
}