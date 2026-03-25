import { DateFormatter } from "@/modules/shared/common/view/utils/date-formatter.util";
import { NotificationResponseDto } from "../../application/dtos/responses/notification-response.dto";
import { NotificationEntity } from "../../domain/entities/notification.entity";

export function toNotificationEntity(data:NotificationResponseDto):NotificationEntity{
    return {
        id: data.id,
        isRead:data.isRead,
        createdAt: DateFormatter.formatShort(data.createdAt),
        title: data.title,
        status: data.status,
        notificationType: data.notificationType,
        message: data.message,
        details: data.details,
        errorType: data.errorType
    }
}