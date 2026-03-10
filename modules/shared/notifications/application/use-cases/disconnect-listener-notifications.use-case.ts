import { SocketPort } from "../ports/socket.port";

export class DisconnectListenerUseCase{
    constructor(private readonly socketService: SocketPort) {}
    execute(userId: string) {
        this.socketService.disconnect(userId)
    }
}