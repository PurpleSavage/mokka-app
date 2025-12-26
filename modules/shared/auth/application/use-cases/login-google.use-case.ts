import { LoginGoogleAuthDto } from "../dtos/request/login-google-auth.dto";
import { AuthApiPort } from "../ports/auth.port";

export class LoginWithGoogleUseCase{
    constructor(private readonly authService:AuthApiPort){}
    execute(dto:LoginGoogleAuthDto){
        return this.authService.loginGoogleAuth(dto)
    }
}