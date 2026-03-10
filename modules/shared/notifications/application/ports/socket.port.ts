import { SocketErrorData, SocketReadyData } from "../../domain/entities/response-notification"
import { JobsNotificationsType } from "../../domain/enums/jobs-notifications"

export interface SocketPort {
    connect(userId: string): void
    disconnect(userId: string): void

    emit<T, K>(name: string, data: T, callback: (response: K) => void): void

    on<T>(eventName: JobsNotificationsType, callback: (data: SocketReadyData<T>) => void): void

    once<T>(eventName: JobsNotificationsType, callback: (data: SocketReadyData<T>) => void): void

    off<T>(eventName: JobsNotificationsType, callback?: (data: SocketReadyData<T>) => void): void

    onError(eventName: JobsNotificationsType, callback: (data: SocketErrorData) => void): void

    offError(eventName: JobsNotificationsType, callback?: (data: SocketErrorData) => void): void

    removeAllListeners(): void

    onAllEvents<T>(
        eventNames: JobsNotificationsType[],
        onReady: (eventName: JobsNotificationsType, data: SocketReadyData<T>) => void,
        onError: (eventName: JobsNotificationsType, data: SocketErrorData) => void
    ): void
}