import { NotificationEntity } from "@/modules/shared/notifications/domain/entities/notification.entity";
import { JobsNotificationsType } from "@/modules/shared/notifications/domain/enums/jobs-notifications";
import { ErrorPlatformMokka } from "../../../domain/enums/errors-types";

export interface SocketResponseError{
    jobId: string,
    notificationType: JobsNotificationsType,
    notification: NotificationEntity,
    error: string,
    errorType: ErrorPlatformMokka,
    statusCode:number, 
    details?: string       
}