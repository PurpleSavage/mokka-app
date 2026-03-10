
import { DisconnectListenerUseCase } from "../application/use-cases/disconnect-listener-notifications.use-case"
import { ListenAllNotificationsUseCase } from "../application/use-cases/listen-all-notifications.use-case"
import { SocketErrorData, SocketReadyData } from "../domain/entities/response-notification"
import { JobsNotificationsType } from "../domain/enums/jobs-notifications"
import { SocketService } from "../infrastrcuture/adapters/socket-service.adapter"
import { ConenctListenerUseCase } from "../application/use-cases/connect-listener-notifications.use-case"

const socketService = new SocketService() 
const useCases={
    listenAllNotifications: new ListenAllNotificationsUseCase(socketService),
    disconnect: new DisconnectListenerUseCase(socketService),
    connect: new ConenctListenerUseCase(socketService)
}
export const socketDI = {
    listenAllNotifications: (
        onReady: (eventName: JobsNotificationsType, data: SocketReadyData<unknown>) => void,
        onError: (eventName: JobsNotificationsType, data: SocketErrorData) => void
    ) => useCases.listenAllNotifications.execute(onReady, onError),

    disconnect:(user:string)=>useCases.disconnect.execute(user),
    connect:(user:string)=>useCases.connect.execute(user)
}