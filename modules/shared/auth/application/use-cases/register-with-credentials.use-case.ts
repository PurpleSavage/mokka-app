import { RegisterWithCredentialsDto } from "../dtos/request/register-with-credentials.dto";
import { AuthApiPort } from "../ports/auth.port";

export class RegisterWithCredentialsUseCase{
    constructor(private readonly authService:AuthApiPort){}
    execute(dto:RegisterWithCredentialsDto){
        return this.authService.registerUser(dto)
    }
}