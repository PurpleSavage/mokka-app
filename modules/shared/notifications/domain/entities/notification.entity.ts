import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";
import { JobsNotificationsType } from "../enums/jobs-notifications"
import {  StatusQueueType } from "@/modules/shared/common/domain/enums/status-queue";

export interface NotificationEntity{
    id: string,
    createdAt: string,
    isRead:boolean,
    title: string,
    status: StatusQueueType,
    notificationType: JobsNotificationsType,
    message?: string,
    details?: string,
    errorType?: ErrorPlatformMokka
}