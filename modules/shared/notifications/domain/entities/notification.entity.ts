import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";
import { JobsNotificationsType } from "../enums/jobs-notifications"
import { StatusQueue } from "@/modules/shared/common/domain/enums/status-queue";

export interface NotificationEntity{
    id: string,
    user:string,
    createdAt: Date,
    title: string,
    status: StatusQueue,
    notificationType: JobsNotificationsType,
    message?: string,
    details?: string,
    errorType?: ErrorPlatformMokka
}