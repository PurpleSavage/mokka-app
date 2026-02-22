import axios, { AxiosInstance, AxiosRequestConfig} from "axios";
import { HttpClientPort } from "../../application/ports/http-client.port";

export class HttpExternalService implements HttpClientPort {
    private static instance: HttpExternalService
    private readonly axiosClient: AxiosInstance
    constructor(config:{
        baseUrl:string
    }){
        this.axiosClient = axios.create({
            baseURL:config.baseUrl,
            headers: { 'Content-Type': 'application/json' },
            timeout:5000
        })
    }
    static getInstance(config:{
        baseUrl:string
    }): HttpExternalService {
        if (!HttpExternalService.instance) {
            HttpExternalService.instance = new HttpExternalService({baseUrl:config.baseUrl})
        }
        return HttpExternalService.instance
    }
     async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
            const { data } = await this.axiosClient.get<T>(url, config)
            return data
        }
    
        async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
            const { data } = await this.axiosClient.post<T>(url, body, config)
            return data
        }
    
        async put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
            const { data } = await this.axiosClient.put<T>(url, body, config)
            return data
        }
    
        async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
            const { data } = await this.axiosClient.delete<T>(url, config)
            return data
        }
    
        async patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
            const { data } = await this.axiosClient.patch<T>(url, body, config)
            return data
        }
        async head(url: string, config?: AxiosRequestConfig): Promise<void> {
            await this.axiosClient.head(url, config)
        }
        async getBlob(url: string): Promise<Blob> {
            const {data}= await this.axiosClient.get<Blob>(url,{ responseType: "blob" })
            return data
        }
}

const url=`${process.env.NEXT_PUBLIC_COUNTRY_API}/api/v0.1`

export const httpCountriesApi= HttpExternalService.getInstance({baseUrl:url})