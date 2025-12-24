export interface SessionEntity{
    accessToken:string,
    user:{
        email:string,
        id:string,
        typePlan:string,
        createDate:string,
    }
}
