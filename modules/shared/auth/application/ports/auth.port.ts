import { SessionEntity } from "../../domain/entities/session.entity";
import { LoginGoogleAuthDto } from "../dtos/request/login-google-auth.dto";
import { LoginWithCredentialsDto } from "../dtos/request/login-with-credentials.dto";
import { RegisterWithCredentialsDto } from "../dtos/request/register-with-credentials.dto";

export interface AuthApiPort{
    getProfileSession():Promise<SessionEntity>
    loginUser(dto:LoginWithCredentialsDto):Promise<SessionEntity>
    registerUser(dto:RegisterWithCredentialsDto):Promise<SessionEntity>
    loginGoogleAuth(dto:LoginGoogleAuthDto):Promise<SessionEntity>
}