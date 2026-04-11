import { BackgroundMockupResponseDto } from "../../application/dtos/response/background-mockup-response.dto";
import { BackgroundMockupEntity } from "../../domain/entities/background-mockup.entity";

export function toBackgroundEntity(data:BackgroundMockupResponseDto):BackgroundMockupEntity{
    return {
        id:data.id,
        backgroundUrl:data.backgroundUrl,
        name:data.name,
        createdAt:data.createdAt
    }
}