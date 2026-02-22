import { CommonPort } from "../ports/common.port";
import { HttpClientPort } from "../ports/http-client.port";

export class GetCountriesUseCase{
    constructor(private readonly commonService:CommonPort){}
    execute(httpExternalService:HttpClientPort){
        return this.commonService.getCountries(httpExternalService)
    }
}