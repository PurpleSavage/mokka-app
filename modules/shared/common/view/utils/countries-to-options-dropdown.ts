import { CountryEntity } from "../../domain/entities/country.entity";
import { Option } from "../components/DropDown";

export function countriesToOptionsDropDown(data:CountryEntity[]):Option<string>[]{
    return data.map((country)=>{
        return {
            id:`${country.iso2}-${country.iso3}-${country.name}`,
            name:country.name
        }
    })
}