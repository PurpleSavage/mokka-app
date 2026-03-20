import { io, Socket } from "socket.io-client"
import { SocketPort } from "../../application/ports/socket.port"
import { JobsNotificationsType } from "../../domain/enums/jobs-notifications";
import { SocketReadyResponseDto } from "@/modules/shared/common/application/dtos/responses/socket-response-ready.dto";
import { SocketResponseError } from "@/modules/shared/common/application/dtos/responses/socket-response-error.dto";


export class SocketService implements SocketPort {
    private socketClient: Socket;

    constructor() {
        this.socketClient = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
            autoConnect: false,
            reconnection: true,        
            reconnectionAttempts: 5,    
            reconnectionDelay: 1000, 
            timeout: 20000,
        });
    }

    connect(userId: string): void {
        this.socketClient.connect()
        this.socketClient.once('connect', () => {
            this.socketClient.emit('join-user-room', userId)
        })
        this.socketClient.on('room-joined', (data) => {
            console.log('✅ Conectado al room:', data)
        })
    }

    disconnect(userId: string): void {
        this.socketClient.emit('leave-user-room', userId)
        this.socketClient.disconnect()
    }

    emit<T, K>(name: string, data: T, callback: (response: K) => void): void {
        this.socketClient.emit(name, data, callback);
    }

    on<T>(eventName: JobsNotificationsType, callback: (data: SocketReadyResponseDto<T>) => void): void {
        this.socketClient.on(`${eventName}-ready`, callback);
    }

    onAllEvents<T>(
        eventNames: JobsNotificationsType[],
        onReady: (eventName: JobsNotificationsType, data: SocketReadyResponseDto<T>) => void,
        onError: (eventName: JobsNotificationsType, data: SocketResponseError) => void
    ): void {
        eventNames.forEach((event) => {
            this.socketClient.on(`${event}-ready`, (data: SocketReadyResponseDto<T>) => {
                onReady(event, data);
            });
            this.socketClient.on(`${event}-error`, (data: SocketResponseError) => {
                onError(event, data);
            });
        });
    }

    
    once<T>(eventName: JobsNotificationsType, callback: (data: SocketReadyResponseDto<T>) => void): void {
        this.socketClient.once(`${eventName}-ready`, callback);
    }

    off<T>(eventName: JobsNotificationsType, callback?: (data: SocketReadyResponseDto<T>) => void): void {
        this.socketClient.off(`${eventName}-ready`, callback);
    }

    onError(eventName: JobsNotificationsType, callback: (data: SocketResponseError) => void): void {
        this.socketClient.on(`${eventName}-error`, callback);
    }

    offError(eventName: JobsNotificationsType, callback?: (data: SocketResponseError) => void): void {
        this.socketClient.off(`${eventName}-error`, callback);
    }

    removeAllListeners(): void {
        this.socketClient.removeAllListeners();
    }
}