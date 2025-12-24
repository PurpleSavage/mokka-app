import { AuthApiPort } from "../ports/auth.port";

export class GetProfileSessionUseCase{
    constructor(private readonly authService:AuthApiPort){}
    execute(){
        return this.authService.getProfileSession()
    }
}