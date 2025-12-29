import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { AuthApiPort } from "../../application/ports/auth.port";
import { SessionEntity } from "../../domain/entities/session.entity";
import { LoginWithCredentialsDto } from "../../application/dtos/request/login-with-credentials.dto";
import { LoginGoogleAuthDto } from "../../application/dtos/request/login-google-auth.dto";
import { RegisterWithCredentialsDto } from "../../application/dtos/request/register-with-credentials.dto";

export class AuthApiService implements AuthApiPort{
    constructor(private readonly httpService:HttpClientPort ){}
    async getProfileSession(): Promise<SessionEntity> {
        const session = await this.httpService.get<SessionEntity>('/v1/auth/read/profile')
        return session
    }
    async loginUser(dto:LoginWithCredentialsDto):Promise<SessionEntity>{
        const session = await this.httpService.post<SessionEntity>('/v1/auth/write/login/credentials',dto)
        return session
    }
    async registerUser(dto:RegisterWithCredentialsDto): Promise<SessionEntity> {
        const session = await this.httpService.post<SessionEntity>('/v1/auth/write/user/new',dto)
        return session
    }
    async loginGoogleAuth(dto: LoginGoogleAuthDto): Promise<SessionEntity> {
        const session = await this.httpService.post<SessionEntity>('/v1/auth/write/login/google',dto)
        return session
    }
}