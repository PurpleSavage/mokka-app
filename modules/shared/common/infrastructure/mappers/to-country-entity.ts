import { CountryDataResponseDto } from "../../application/dtos/responses/countries-response.dto";
import { CountryEntity } from "../../domain/entities/country.entity";

export function toCountryEntity(data:CountryDataResponseDto):CountryEntity{
    return {
        iso2:data.iso2,
        iso3:data.iso3,
        name:data.name,
        flag:data.flag
    }
}