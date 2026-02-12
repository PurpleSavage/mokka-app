export interface SessionEntity{
    accessToken:string,
    user:{
        email:string,
        id:string,
        credits:number,
        createDate:string,
    }
}
