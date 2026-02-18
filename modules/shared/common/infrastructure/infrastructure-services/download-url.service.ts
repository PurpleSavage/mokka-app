import { HttpClientPort } from "../../application/ports/http-client.port";
import { ErrorPlatformMokka } from "../../domain/enums/errors-types";
import { ApiErrorPlatform } from "../../errors/api-errors.error";

export class DownloadURL{
    constructor(private readonly httpService:HttpClientPort){}
    async donwloadAndConvertBlob(url: string) {
        try {
            const blob = await this.httpService.getBlob(url);
            return blob;
        } catch (error:unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const errorStatus = (error as { status?: number })?.status ?? 500;
            const timestampStr = new Date().toISOString();
            throw new ApiErrorPlatform({
                message: 'An error has occurred, please try again later',
                errorType: ErrorPlatformMokka.HTTP_ERROR,
                status: errorStatus,
                details: `Error downloading URL: ${errorMessage}`,
                timestamp:timestampStr 
            });;
        }
    }
}