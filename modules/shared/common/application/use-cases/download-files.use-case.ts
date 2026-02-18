import { DownloadURL } from "../../infrastructure/infrastructure-services/download-url.service";

export class DownloadFilesUseCase{
    constructor(private readonly downloadService:DownloadURL){}
    execute(url:string){
        return this.downloadService.donwloadAndConvertBlob(url)
    }
}