import { NotificationEntity } from "../../domain/entities/notification.entity";

export interface NotificationsPort{
    listNotifications(userId:string,page?:number):Promise<NotificationEntity[]>
}