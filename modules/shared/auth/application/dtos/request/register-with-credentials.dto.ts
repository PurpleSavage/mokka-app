import { MokkaPlans } from "@/modules/shared/common/domain/enums/mokka-plans";

export interface RegisterWithCredentialsDto{
    email:string,
    password:string,
    country:string,
    countryIsoCode:string,
    plan:MokkaPlans
}