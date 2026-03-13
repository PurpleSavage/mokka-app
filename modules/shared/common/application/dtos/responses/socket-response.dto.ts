import { ErrorPlatformMokka } from "../../../domain/enums/errors-types"

export interface ResponseDataSocket<T = undefined>{
  
  jobId:string,
  status:'processing' | 'completed'| 'failed',
  message?:string
  entity?:T
  error?:string 
  creditsUpdate?:number 
  details?:string
  errorType?: ErrorPlatformMokka;
  createDate?:string
}


