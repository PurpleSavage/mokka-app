import { DownloadFilesUseCase } from "../application/use-cases/download-files.use-case"
import { httpClient } from "../infrastructure/adapters/http-service.adapter"
import { DownloadURL } from "../infrastructure/infrastructure-services/download-url.service"

const donwloadService = new DownloadURL(httpClient)
export const useCases={
    downloadFile: new DownloadFilesUseCase(donwloadService)
}

export const commonDI={
    downloadfile: (url:string)=>useCases.downloadFile.execute(url)
}