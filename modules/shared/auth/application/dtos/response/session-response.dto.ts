export interface SessionResponseDto{
    access_token:string,
    user:{
        email:string,
        id:string,
        credits:number,
        createDate:string,
    }
}


