
import { DisconnectListenerUseCase } from "../application/use-cases/disconnect-listener-notifications.use-case"
import { ListenAllNotificationsUseCase } from "../application/use-cases/listen-all-notifications.use-case"

import { JobsNotificationsType } from "../domain/enums/jobs-notifications"
import { SocketService } from "../infrastructure/adapters/socket-service.adapter"
import { ConenctListenerUseCase } from "../application/use-cases/connect-listener-notifications.use-case"
import { SocketReadyResponseDto } from "../../common/application/dtos/responses/socket-response-ready.dto"
import { SocketResponseError } from "../../common/application/dtos/responses/socket-response-error.dto"

const socketService = new SocketService() 
const useCases={
    listenAllNotifications: new ListenAllNotificationsUseCase(socketService),
    disconnect: new DisconnectListenerUseCase(socketService),
    connect: new ConenctListenerUseCase(socketService)
}
export const socketDI = {
    listenAllNotifications: (
        onReady: (eventName: JobsNotificationsType, data: SocketReadyResponseDto<unknown>) => void,
        onError: (eventName: JobsNotificationsType, data: SocketResponseError) => void
    ) => useCases.listenAllNotifications.execute(onReady, onError),

    disconnect:(user:string)=>useCases.disconnect.execute(user),
    connect:(user:string)=>useCases.connect.execute(user)
}