export interface UserSessionEntity{
    email:string,
        id:string,
        credits:number,
        createDate:string,
}

export interface SessionEntity{
    accessToken:string,
    user:UserSessionEntity
}
