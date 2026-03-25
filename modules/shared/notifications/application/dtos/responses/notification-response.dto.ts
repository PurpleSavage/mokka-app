import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";
import { JobsNotificationsType } from "../../../domain/enums/jobs-notifications";
import { StatusQueue } from "@/modules/shared/common/domain/enums/status-queue";

export interface NotificationResponseDto{
    id: string,
    isRead:boolean,
    user:string,
    createdAt: Date,
    title: string,
    status: StatusQueue,
    notificationType: JobsNotificationsType,
    message?: string,
    details?: string,
    errorType?: ErrorPlatformMokka
}