import {  StatusQueueType } from "../../../domain/enums/status-queue"

export interface ResponseHttpQueue{
    jobId:string,
    status:StatusQueueType
    message:string
}