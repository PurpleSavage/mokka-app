import { DownloadFilesUseCase } from "../application/use-cases/download-files.use-case"
import { GetCountriesUseCase } from "../application/use-cases/get-countries.use-case"
import { CommonApiService } from "../infrastructure/adapters/common-api.service.adapter"
import { httpCountriesApi} from "../infrastructure/adapters/http-external-service.adpter"
import { httpClient } from "../infrastructure/adapters/http-service.adapter"
import { DownloadURL } from "../infrastructure/infrastructure-services/download-url.service"




//services
const donwloadService = new DownloadURL(httpClient)
const commonService = new CommonApiService()


export const useCases={
    downloadFile: new DownloadFilesUseCase(donwloadService),
    getCountries: new GetCountriesUseCase(commonService)
}

export const commonDI={
    downloadfile: (url:string)=>useCases.downloadFile.execute(url),
    getCountries: ()=>useCases.getCountries.execute(httpCountriesApi)
}