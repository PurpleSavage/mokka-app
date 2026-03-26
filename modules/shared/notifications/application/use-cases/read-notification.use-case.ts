import { NotificationsPort } from "../ports/notifications.port";

export class ReadNotificationUseCase{
    constructor(private readonly notificationsService:NotificationsPort){}
    execute(notificationId: string){
        return this.notificationsService.readNotification(notificationId)
    }
}