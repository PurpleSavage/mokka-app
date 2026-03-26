import { httpClient } from "../../common/infrastructure/adapters/http-service.adapter"
import { ListNotificationsUseCase } from "../application/use-cases/list-notifications.use-case"
import { NotificationsApiService } from "../infrastructure/api-adapters/notifications-api.service"

const notificationsService = new NotificationsApiService(httpClient)
const useCases={
    listNotifications: new ListNotificationsUseCase(notificationsService)
}
export const notificationsDI={
    listNotifications:(userId:string,page?:number)=>useCases.listNotifications.execute(userId,page)
}