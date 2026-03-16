import { NotificationEntity } from "@/modules/shared/notifications/domain/entities/notification.entity";
import { JobsNotificationsType } from "@/modules/shared/notifications/domain/enums/jobs-notifications";

export interface SocketReadyResponseDto<T> {
    jobId: string,
    notificationType: JobsNotificationsType,
    notification: NotificationEntity,
    entity: T,
    creditsUpdated: number
}