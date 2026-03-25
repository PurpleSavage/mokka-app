import { NotificationsPort } from "../ports/notifications.port";

export class ListNotificationsUseCase{
    constructor(private readonly notificationsService:NotificationsPort){}
    execute(userId:string){
        return this.notificationsService.listNotifications(userId)
    }
}