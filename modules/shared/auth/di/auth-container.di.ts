import { httpClient } from "../../common/infrastructure/adapters/http-service.adapter"
import { LocalStorageAdapter } from "../../common/infrastructure/adapters/local-storage.adapter"
import { LoginWithCredentialsDto } from "../application/dtos/request/login-with-credentials.dto"
import { ClearStorageUseCase } from "../application/use-cases/clear-storage.use-case"
import { GetLocalSesssionUseCase } from "../application/use-cases/get-local-session.use-case"
import { GetProfileSessionUseCase } from "../application/use-cases/get-profile-session.use-case"
import { LoginUserUseCase } from "../application/use-cases/login-user.use-case"
import { SaveDataSession } from "../application/use-cases/save-data-session.use-case"
import { SessionEntity } from "../domain/entities/session.entity"
import { AuthApiService } from "../infrastructure/adapters/auth-api.adapter"


const  apiService = new AuthApiService(httpClient)
const localStorage = new LocalStorageAdapter()
export const useCases={
    getProfile: new GetProfileSessionUseCase(apiService),
    saveDataSessin:new SaveDataSession(localStorage),
    getLocalSession: new GetLocalSesssionUseCase(localStorage),
    clearDataStorage: new ClearStorageUseCase(localStorage),
    loginUser: new LoginUserUseCase(apiService)
}


export const authDIContainer={
    getProfile:()=>useCases.getProfile.execute(),
    saveDataSession:(session:SessionEntity)=>useCases.saveDataSessin.execute(session),
    getLocalIdSession:()=>useCases.getLocalSession.execute(),
    clearDataStorage:()=>useCases.clearDataStorage.execute(),
    loginUser:(dto:LoginWithCredentialsDto)=>useCases.loginUser.execute(dto)
}