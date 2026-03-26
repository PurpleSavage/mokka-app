import { NotificationsPort } from "../ports/notifications.port";

export class ListNotificationsUseCase{
    constructor(private readonly notificationsService:NotificationsPort){}
    execute(userId:string,page?:number){
        return this.notificationsService.listNotifications(userId,page)
    }
}