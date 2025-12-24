import { SessionEntity } from "../../domain/entities/session.entity";
import { LoginWithCredentialsDto } from "../dtos/request/login-with-credentials.dto";

export interface AuthApiPort{
    getProfileSession():Promise<SessionEntity>
    loginUser(dto:LoginWithCredentialsDto):Promise<SessionEntity>
    registerUser():Promise<SessionEntity>
}