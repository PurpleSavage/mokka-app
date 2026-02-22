import { CountryEntity } from "../../domain/entities/country.entity";
import { HttpClientPort } from "./http-client.port";

export interface CommonPort{
    getCountries(countriesApiService:HttpClientPort):Promise<CountryEntity[]>
}