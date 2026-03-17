import { SocketReadyResponseDto } from "@/modules/shared/common/application/dtos/responses/socket-response-ready.dto"
import { NotificationEntity } from "../../../domain/entities/notification.entity"

import { JobsNotificationsType } from "../../../domain/enums/jobs-notifications"
import { SocketResponseError } from "@/modules/shared/common/application/dtos/responses/socket-response-error.dto"

export const buildSuccessNotification = <T>(
    data: SocketReadyResponseDto<T>,
    type: JobsNotificationsType
): NotificationEntity => ({
    id: data.notification.id,
    user: data.notification.user,        // ← faltaba
    createdAt: data.notification.createdAt, // ← era createAt
    title: data.notification.title,
    status: data.notification.status,
    notificationType: type,
    ...(data.notification.message && { message: data.notification.message })
})

export const buildErrorNotification = (
    error: SocketResponseError,
    type: JobsNotificationsType
): NotificationEntity => ({
    id: error.notification.id,
    user: error.notification.user,       // ← faltaba
    createdAt: error.notification.createdAt,
    title: error.notification.title,
    status: error.notification.status,
    notificationType: type,
    ...(error.details && { details: error.details }),
    ...(error.errorType && { errorType: error.errorType })
})
