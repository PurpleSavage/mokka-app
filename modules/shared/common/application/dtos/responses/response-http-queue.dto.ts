import { StatusQueue } from "../../../domain/enums/status-queue"

export interface ResponseHttpQueue{
    jobId:string,
    status:StatusQueue
    message:string
}