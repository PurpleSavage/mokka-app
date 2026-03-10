import { io, Socket } from "socket.io-client"
import { SocketPort } from "../../application/ports/socket.port"
import { JobsNotificationsType } from "../../domain/enums/jobs-notifications";
import { SocketErrorData, SocketReadyData } from "../../domain/entities/response-notification";


export class SocketService implements SocketPort {
    private socketClient: Socket;

    constructor() {
        this.socketClient = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
            autoConnect: false
        });
    }

    connect(userId: string): void {
        this.socketClient.connect()
        this.socketClient.once('connect', () => {
            this.socketClient.emit('join-user-room', userId)
        })
    }

    disconnect(userId: string): void {
        this.socketClient.emit('leave-user-room', userId)
        this.socketClient.disconnect()
    }

    emit<T, K>(name: string, data: T, callback: (response: K) => void): void {
        this.socketClient.emit(name, data, callback);
    }

    on<T>(eventName: JobsNotificationsType, callback: (data: SocketReadyData<T>) => void): void {
        this.socketClient.on(`${eventName}-ready`, callback);
    }

    onAllEvents<T>(
        eventNames: JobsNotificationsType[],
        onReady: (eventName: JobsNotificationsType, data: SocketReadyData<T>) => void,
        onError: (eventName: JobsNotificationsType, data: SocketErrorData) => void
    ): void {
        eventNames.forEach((event) => {
            this.socketClient.on(`${event}-ready`, (data: SocketReadyData<T>) => {
                onReady(event, data);
            });
            this.socketClient.on(`${event}-error`, (data: SocketErrorData) => {
                onError(event, data);
            });
        });
    }

    
    once<T>(eventName: JobsNotificationsType, callback: (data: SocketReadyData<T>) => void): void {
        this.socketClient.once(`${eventName}-ready`, callback);
    }

    off<T>(eventName: JobsNotificationsType, callback?: (data: SocketReadyData<T>) => void): void {
        this.socketClient.off(`${eventName}-ready`, callback);
    }

    onError(eventName: JobsNotificationsType, callback: (data: SocketErrorData) => void): void {
        this.socketClient.on(`${eventName}-error`, callback);
    }

    offError(eventName: JobsNotificationsType, callback?: (data: SocketErrorData) => void): void {
        this.socketClient.off(`${eventName}-error`, callback);
    }

    removeAllListeners(): void {
        this.socketClient.removeAllListeners();
    }
}