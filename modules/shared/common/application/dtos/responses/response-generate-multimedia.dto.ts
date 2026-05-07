import {  StatusQueueType } from "../../../domain/enums/status-queue";

export interface ResponseGenerateMultimediaDto{
    jobId:string | number,
    status:StatusQueueType,
    message:string
}