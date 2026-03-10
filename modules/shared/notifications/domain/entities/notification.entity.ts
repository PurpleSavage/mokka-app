import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";
import { JobsNotificationsType } from "../enums/jobs-notifications"

export interface NotificationEntity{
    id:string
    createAt:string,
    title:string,
    status:'processing' | 'completed'| 'failed'
    notificationType:JobsNotificationsType
    message?:string
    details?:string
    errorType?: ErrorPlatformMokka;
}