import { NotificationEntity } from "../../domain/entities/notification.entity";

export interface NotificationsPort{
    listNotifications(userId:string):Promise<NotificationEntity[]>
}