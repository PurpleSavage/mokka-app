
export interface CountryDataResponseDto{
    iso2:string,
    iso3:string,
    name:string,
    flag:string
}
export interface ListCountriesResponseDto{
    error:boolean,
    msg:string,
    data:CountryDataResponseDto[]
}