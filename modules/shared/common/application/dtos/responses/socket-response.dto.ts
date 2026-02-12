export interface ResponseDataSocket<T = undefined>{
  
  jobId:string,
  status:'processing' | 'completed'| 'failed',
  message?:string
  entity?:T
  error?:string 
  creditsUpdate?:number 
}
