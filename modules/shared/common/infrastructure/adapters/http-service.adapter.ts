import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import { HttpClientPort } from "../../application/ports/http-client.port"
import { ResponseRefreshTokenDto } from "@/modules/shared/auth/application/dtos/response/refresh-token.dto"
import { boundStore } from "@/store/boundStore"
import { SessionEntity, UserSessionEntity } from "@/modules/shared/auth/domain/entities/session.entity"
import { setSession } from "@/modules/shared/auth/store-slice/auth.slice"
import { AuthTokenCache } from "../services/auth-token-cache.service"


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
    let isRefreshing = false
    let queue: Array<{
        resolve: (token: string) => void
        reject: (error: unknown) => void
    }> = []

    const processQueue = (error: unknown, token: string | null) => {
        queue.forEach(({ resolve, reject }) => {
            if (error) reject(error)
            else resolve(token!)
        })
        queue = []
    }

    // agrega el token a cada request
    this.axiosClient.interceptors.request.use(
        (req) => {
            const token = AuthTokenCache.getToken()
            if (token) req.headers.Authorization = `Bearer ${token}`
            return req
        },
        (error) => Promise.reject(error)
    )

    // maneja 401 con cola
    this.axiosClient.interceptors.response.use(
        res => res,
        async (error: AxiosError) => {
            const originalRequest = error.config as RetryableAxiosRequestConfig
            console.log(`[HTTP] Error en: ${originalRequest.url} - Status: ${error.response?.status} - Connection: ${!error.response}`);
            const data = error.response?.data as UnauthorizedResponse

            // no es 401 — connection reset, reintenta una vez
            if (!error.response && !originalRequest?._retry) {
                console.log(`[HTTP] ⚠️ Reset de conexión en ${originalRequest.url}. Reintentos: ${originalRequest._retry}`);
                originalRequest._retry = true
                return this.axiosClient(originalRequest)
            }

            // no es 401
            if (error.response?.status !== 401) {
                return Promise.reject(error)
            }

            // refresh token expirado — logout
            if (data?.renovate === false) {
                console.log('❌ Refresh token expired, redirecting to login')
                localStorage.clear()
                window.location.href = '/mokka/auth'
                return Promise.reject(error)
            }

            // ya está refrescando — encola
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    queue.push({ resolve, reject })
                }).then(token => {
                    originalRequest.headers!.Authorization = `Bearer ${token}`
                    return this.axiosClient(originalRequest)
                })
            }

            // primera petición — refresca
            isRefreshing = true
            originalRequest._retry = true

            try {
                const rawEmail = localStorage.getItem('email_session')
                const userRaw = localStorage.getItem('user_session_mokka')

                if (!rawEmail || !userRaw) {
                    localStorage.clear()
                    window.location.href = '/mokka/auth'
                    return Promise.reject(error)
                }

                const email = rawEmail.replace(/"/g, '')
                const { data: refreshData } = await axios.get<ResponseRefreshTokenDto>(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/read/refresh-token/${email}`,
                    { withCredentials: true }
                )

                const userData: UserSessionEntity = JSON.parse(userRaw)
                console.log('✅ Token refreshed successfully',refreshData.access_token)
                console.log(queue)
                AuthTokenCache.setToken(refreshData.access_token)
                boundStore.dispatch(setSession({
                    accessToken: refreshData.access_token,
                    user: userData
                } as SessionEntity))

                processQueue(null, refreshData.access_token)

                originalRequest.headers!.Authorization = `Bearer ${refreshData.access_token}`
                return this.axiosClient(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError, null)
                localStorage.clear()
                window.location.href = '/mokka/auth'
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
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