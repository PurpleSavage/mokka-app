import { NotificationEntity } from "../../domain/entities/notification.entity";
import { ReadNotificationResponseDto } from "../dtos/responses/read-notification-response.dto";

export interface NotificationsPort{
    listNotifications(userId:string,page?:number):Promise<NotificationEntity[]>
    readNotification(notificationId:string):Promise<ReadNotificationResponseDto>
}