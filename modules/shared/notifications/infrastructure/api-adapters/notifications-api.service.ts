import axios from "axios";
import { NotificationsPort } from "../../application/ports/notifications.port";
import { NotificationEntity } from "../../domain/entities/notification.entity";
import { ApiErrorPlatform } from "@/modules/shared/common/infrastructure/errors/api-errors.error";
import { ErrorPlatformMokka } from "@/modules/shared/common/domain/enums/errors-types";
import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";
import { NotificationResponseDto } from "../../application/dtos/responses/notification-response.dto";
import { toNotificationEntity } from "../mappers/to-notification-entity.mapper";

export class NotificationsApiService implements NotificationsPort{
    constructor(private readonly httpService:HttpClientPort){}
    private handleError(error: unknown): never {
        if (axios.isAxiosError(error)) {
            throw new ApiErrorPlatform({
                message: error.response?.data?.message || 'An error occurred',
                errorType: error.response?.data?.errorType || ErrorPlatformMokka.MOKKA_ERROR,
                status: error.response?.status || 500,
                details: error.response?.data?.details
            })
        }
        throw error
    }
    async listNotifications(userId: string): Promise<NotificationEntity[]> {
        try {
            const notifications = await this.httpService.get<NotificationResponseDto[]>(`/v1/notifications/read/all/${userId}`)
            return notifications.map((entity)=>toNotificationEntity(entity)) 
        } catch (error) {
            this.handleError(error)
        }
    }
}