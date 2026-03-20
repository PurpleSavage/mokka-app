import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import { HttpClientPort } from "../../application/ports/http-client.port"
import { ResponseRefreshTokenDto } from "@/modules/shared/auth/application/dtos/response/refresh-token.dto"
import { boundStore } from "@/store/boundStore"
import { SessionEntity, UserSessionEntity } from "@/modules/shared/auth/domain/entities/session.entity"
import { setSession } from "@/modules/shared/auth/store-slice/auth.slice"
import { AuthTokenCache } from "../services/auth-token-cache.service"
import createAuthRefreshInterceptor from 'axios-auth-refresh'


interface UnauthorizedResponse {
    message: string
    statusCode: number
    renovate: boolean
}
interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean
}

export class HttpClientSingleton implements HttpClientPort {
    private static instance: HttpClientSingleton
    private readonly axiosClient: AxiosInstance

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
        // agrega el token a cada request
        this.axiosClient.interceptors.request.use(
            (req) => {
                const token = AuthTokenCache.getToken()
                if (token) req.headers.Authorization = `Bearer ${token}`
                return req
            },
            (error) => Promise.reject(error)
        )

        // reintenta una vez si hay connection reset
        this.axiosClient.interceptors.response.use(
            res => res,
            async (error: AxiosError) => {
                const originalRequest = error.config as RetryableAxiosRequestConfig
                if (!error.response && !originalRequest?._retry) {
                    console.log('🔄 Connection reset, retrying...', originalRequest?.url)
                    originalRequest._retry = true
                    return this.axiosClient(originalRequest)
                }
                return Promise.reject(error)
            }
        )

        // maneja el refresh de token automáticamente con cola
        createAuthRefreshInterceptor(
            this.axiosClient,
            async (failedRequest) => {
                const renovate = (failedRequest.response?.data as UnauthorizedResponse)?.renovate

                if (renovate === false) {
                    console.log('❌ Refresh token expired, redirecting to login')
                    localStorage.clear()
                    window.location.href = '/mokka/auth'
                    return Promise.reject()
                }

                try {
                    const rawEmail = localStorage.getItem('email_session')
                    const userRaw = localStorage.getItem('user_session_mokka')

                    if (!rawEmail || !userRaw) {
                        localStorage.clear()
                        window.location.href = '/mokka/auth'
                        return Promise.reject()
                    }

                    const email = rawEmail.replace(/"/g, '')
                    const { data } = await axios.get<ResponseRefreshTokenDto>(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/read/refresh-token/${email}`,
                        { withCredentials: true }
                    )

                    const userData: UserSessionEntity = JSON.parse(userRaw)
                    console.log('✅ Token refreshed successfully')
                    AuthTokenCache.setToken(data.access_token)
                    boundStore.dispatch(setSession({
                        accessToken: data.access_token,
                        user: userData
                    } as SessionEntity))

                    failedRequest.response.config.headers.Authorization = `Bearer ${data.access_token}`
                    return Promise.resolve()
                } catch {
                    console.log('❌ Refresh failed, redirecting to login')
                    localStorage.clear()
                    window.location.href = '/mokka/auth'
                    return Promise.reject()
                }
            },
            {
                statusCodes: [401],
                shouldRefresh: () => true,
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

    async getBlob(url: string): Promise<Blob> {
        const { data } = await this.axiosClient.get<Blob>(url, { responseType: 'blob' })
        return data
    }
}

export const httpClient = HttpClientSingleton.getInstance()