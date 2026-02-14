import { SessionResponseDto } from "../../application/dtos/response/session-response.dto";
import { SessionEntity } from "../../domain/entities/session.entity";

export function toSessionEntity(data:SessionResponseDto):SessionEntity{
    return {
        accessToken:data.access_token,
        user:data.user
    }
}