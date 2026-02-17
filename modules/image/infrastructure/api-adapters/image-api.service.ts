import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto";
import { GenerateImageDto } from "../../application/dtos/request/generate-image.dto";
import { ImagePort } from "../../application/ports/image.port";
import { ImageEntity } from "../../domain/entities/Image.entity";
import { HttpClientPort } from "@/modules/shared/common/application/ports/http-client.port";

export class ImageApiService implements ImagePort {
    constructor(private readonly httpService:HttpClientPort){}
    async generateImage(dto: GenerateImageDto): Promise<ResponseDataSocket<ImageEntity>> {
        const response = await this.httpService.post<ResponseDataSocket<ImageEntity>>(
            '/v1/image/read/generations',dto
        )
        return response
    }
}