import { SocketReadyResponseDto } from "@/modules/shared/common/application/dtos/responses/socket-response-ready.dto"
import { JobsNotificationsType } from "../../domain/enums/jobs-notifications"
import { SocketResponseError } from "@/modules/shared/common/application/dtos/responses/socket-response-error.dto"

export interface SocketPort {
    connect(userId: string): void
    disconnect(userId: string): void

    emit<T, K>(name: string, data: T, callback: (response: K) => void): void

    on<T>(eventName: JobsNotificationsType, callback: (data: SocketReadyResponseDto<T>) => void): void

    once<T>(eventName: JobsNotificationsType, callback: (data: SocketReadyResponseDto<T>) => void): void

    off<T>(eventName: JobsNotificationsType, callback?: (data: SocketReadyResponseDto<T>) => void): void

    onError(eventName: JobsNotificationsType, callback: (data: SocketResponseError) => void): void

    offError(eventName: JobsNotificationsType, callback?: (data: SocketResponseError) => void): void

    removeAllListeners(): void

    onAllEvents<T>(
        eventNames: JobsNotificationsType[],
        onReady: (eventName: JobsNotificationsType, data: SocketReadyResponseDto<T>) => void,
        onError: (eventName: JobsNotificationsType, data: SocketResponseError) => void
    ): void
}