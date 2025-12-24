import { LoginWithCredentialsDto } from "../dtos/request/login-with-credentials.dto";
import { AuthApiPort } from "../ports/auth.port";

export class LoginUserUseCase{
    constructor(private readonly authService:AuthApiPort){}
    execute(dto:LoginWithCredentialsDto){
        return this.authService.loginUser(dto)
    }
}