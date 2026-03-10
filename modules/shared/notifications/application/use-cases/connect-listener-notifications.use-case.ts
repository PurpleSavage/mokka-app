import { SocketPort } from "../ports/socket.port";

export class ConenctListenerUseCase{
     constructor(private readonly socketService: SocketPort) {}
        execute(userId: string) {
            this.socketService.connect(userId)
        }
    }
