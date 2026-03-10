import { NotificationEntity } from "../../../domain/entities/notification.entity"
import { SocketErrorData, SocketReadyData } from "../../../domain/entities/response-notification"
import { JobsNotificationsType } from "../../../domain/enums/jobs-notifications"
import { ERROR_TITLES, SUCCESS_TITLES } from "../../constants/titles-notifications"

export const buildSuccessNotification =<T> (
    data: SocketReadyData<T>,
    type: JobsNotificationsType
): NotificationEntity => ({
    id: '',
    createAt: data.createDate,
    title: SUCCESS_TITLES[type],
    status: data.status,
    notificationType: type,
    ...(data.message && { message: data.message })
})

export const buildErrorNotification = (
    error: SocketErrorData,
    type: JobsNotificationsType
): NotificationEntity => ({
    id: '',
    createAt: error.createDate,
    title: ERROR_TITLES[type],
    status: error.status,
    notificationType: type,
    ...(error.details   && { details: error.details }),
    ...(error.errorType && { errorType: error.errorType })
})
