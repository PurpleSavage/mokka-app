import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import { HttpClientPort } from "../../application/ports/http-client.port"
import { ResponseRefreshTokenDto } from "@/modules/shared/auth/application/dtos/response/refresh-token.dto"
import { boundStore } from "@/store/boundStore"
import { SessionEntity } from "@/modules/shared/auth/domain/entities/session.entity"
import { setSession } from "@/modules/shared/auth/store-slice/auth.slice"
import { AuthTokenCache } from "../services/auth-token-cache.service"

interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}


export class HttpClientSingleton implements HttpClientPort {
    private static instance: HttpClientSingleton
    private readonly axiosClient: AxiosInstance
    private isRefreshing = false
    private failedQueue: Array<{
        resolve: (token: string) => void
        reject: (error: unknown) => void
    }> = []

    private constructor() {
        this.axiosClient = axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        })
        this.setupInterceptors()
    }

    static getInstance(): HttpClientSingleton {
        if (!HttpClientSingleton.instance) {
            HttpClientSingleton.instance = new HttpClientSingleton()
        }
        return HttpClientSingleton.instance
    }

    private setupInterceptors(): void {
        this.axiosClient.interceptors.request.use(
            (req) => {
                const token = AuthTokenCache.getToken();
                if (token) {
                    req.headers.Authorization = `Bearer ${token}`
                }
                return req
            },
            (error) => {
                throw error  
            }
        )

        this.axiosClient.interceptors.response.use(
            (res) => res,
            async (error: AxiosError) => {
                const originalRequest = error.config as RetryableAxiosRequestConfig
                const responseData = error.response?.data as { error?: string; renovate?: boolean,credentials?:boolean }
                if (!originalRequest) {
                    throw error
                }
                if (error.response?.status === 401 && responseData?.credentials===false) {
                    window.location.href ='/mokka/auth';
                    throw error
                }
                if (error.response?.status === 401 && responseData?.renovate === false) {
                   
                    localStorage.removeItem("id_session");
                    localStorage.removeItem("email_session")
                    window.location.href ='/mokka/auth';
                    throw error
                }  
                if (error.response?.status === 401 && responseData?.renovate === true &&  !originalRequest._retry) {
                    if (this.isRefreshing) {
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({
                                resolve: (token: string) => {
                                    originalRequest.headers!.Authorization = `Bearer ${token}`
                                    resolve(this.axiosClient(originalRequest))
                                },
                                reject
                            })
                        })
                    }

                    originalRequest._retry = true
                    this.isRefreshing = true

                    try {
                        const email = localStorage.getItem("email_session")

                        if (!email) {
                            this.isRefreshing = false;
                            window.location.href ='/mokka/auth';
                            throw new Error("No session ID")
                        }
                        const { data } = await axios.get<ResponseRefreshTokenDto>(
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/read/refresh-token/${email}`,
                        
                        )
                        const state = boundStore.getState()
                        const authState = state.auth.session
                        if(!authState){
                            window.location.href ='/mokka/auth';
                            throw new Error("No session token")
                        }
                        const objAuth:SessionEntity = {
                            accessToken:data.access_token,
                            user:authState?.user
                        }
                        AuthTokenCache.setToken(data.access_token)
                        boundStore.dispatch(setSession(objAuth))
                        this.failedQueue.forEach(p => p.resolve(data.access_token))
                        this.failedQueue = []
                        this.isRefreshing = false

                        originalRequest.headers!.Authorization = `Bearer ${data.access_token}`
                        return this.axiosClient(originalRequest)
                    } catch (refreshError) {
                        this.failedQueue.forEach(p => p.reject(refreshError))
                        this.failedQueue = []
                        this.isRefreshing = false
                        localStorage.clear()
                       globalThis.location.href = '/'
                        throw refreshError
                    }
                }

                throw error 
            }
        )
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
}

export const httpClient = HttpClientSingleton.getInstance()