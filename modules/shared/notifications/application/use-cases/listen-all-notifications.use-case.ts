import { SocketErrorData, SocketReadyData } from "../../domain/entities/response-notification";
import { JobsNotificationsType } from "../../domain/enums/jobs-notifications";
import { SocketPort } from "../ports/socket.port";

export class ListenAllNotificationsUseCase {
    private allEvents = [
        JobsNotificationsType.IMAGE, 
        JobsNotificationsType.VIDEO,
        JobsNotificationsType.AUDIO,
        JobsNotificationsType.IMAGE_REMIX,
        JobsNotificationsType.INFLUENCER,
        JobsNotificationsType.INFLUENCER_SCENE,
        JobsNotificationsType.INFLUENCER_SNAPSHOT,
        JobsNotificationsType.TEXT
    ]

    constructor(private readonly socketService: SocketPort) {}

    execute(
        onReady: (eventName: JobsNotificationsType, data: SocketReadyData<unknown>) => void,
        onError: (eventName: JobsNotificationsType, data: SocketErrorData) => void
    ) {
        this.socketService.onAllEvents(this.allEvents, onReady, onError);
    }
}