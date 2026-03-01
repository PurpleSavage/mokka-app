import { StatusQueue } from "../../../domain/enums/status-queue";

export interface ResponseGenerateMultimediaDto{
    jobId:string | number,
    status:StatusQueue,
    message:string
}