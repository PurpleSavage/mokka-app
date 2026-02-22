import { ListCountriesResponseDto } from "../../application/dtos/responses/countries-response.dto";
import { CommonPort } from "../../application/ports/common.port";
import { HttpClientPort } from "../../application/ports/http-client.port";
import { toCountryEntity } from "../mappers/to-country-entity";

export class CommonApiService implements CommonPort{
    
    async getCountries(countriesApiService:HttpClientPort){
        const countries =await countriesApiService.get<ListCountriesResponseDto>('/countries/flag/images')
        return  countries.data.map((countryData)=>toCountryEntity(countryData))
    }
}