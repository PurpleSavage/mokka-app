import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import { ResponseRefreshTokenDto } from "@/modules/shared/auth/application/dtos/response/refresh-token.dto"
import { boundStore } from "@/store/boundStore"
import { setSession } from "@/modules/shared/auth/store-slice/auth.slice"
import { AuthTokenCache } from "../services/auth-token-cache.service"


interface UnauthorizedResponse {
    message: string;
    statusCode: number;
    renovate: boolean;
}
interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

export class HttpClientSingleton {
    private static instance: HttpClientSingleton;
    private readonly axiosClient: AxiosInstance;

    private constructor() {
        this.axiosClient = axios.create({
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });
        this.setupInterceptors();
    }

    static getInstance(): HttpClientSingleton {
        if (!HttpClientSingleton.instance) {
            HttpClientSingleton.instance = new HttpClientSingleton();
        }
        return HttpClientSingleton.instance;
    }

    private setupInterceptors(): void {
        let isRefreshing = false;
        let queue: Array<{
            resolve: (token: string) => void;
            reject: (error: unknown) => void;
        }> = [];

        const processQueue = (error: unknown, token: string | null) => {
            queue.forEach(({ resolve, reject }) => {
                if (error) reject(error);
                else resolve(token!);
            });
            queue = [];
        };

        // 1. Interceptor de Petición: Inyecta el Access Token de la Cache (JS)
        this.axiosClient.interceptors.request.use(
            (req) => {
                const token = AuthTokenCache.getToken();
                if (token) req.headers.Authorization = `Bearer ${token}`;
                return req;
            },
            (error) => Promise.reject(error)
        );

        // 2. Interceptor de Respuesta: Maneja 401 y Refresh Token
        this.axiosClient.interceptors.response.use(
            res => res,
            async (error: AxiosError) => {
                const originalRequest = error.config as RetryableAxiosRequestConfig;
                const data = error.response?.data as UnauthorizedResponse;

                // Error de red o conexión perdida
                if (!error.response && !originalRequest?._retry) {
                    originalRequest._retry = true;
                    return this.axiosClient(originalRequest);
                }

                // Si no es 401, no nos corresponde manejarlo aquí
                if (error.response?.status !== 401) {
                    return Promise.reject(error);
                }

                // Caso: El Refresh Token también expiró (Backend envía renovate: false)
                if (data?.renovate === false) {
                    this.handleLogout();
                    return Promise.reject(error);
                }

                // Caso: Ya hay una renovación en curso, encolamos esta petición
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        queue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers!.Authorization = `Bearer ${token}`;
                        return this.axiosClient(originalRequest);
                    });
                }

                // Iniciar proceso de renovación
                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    // Llamada al nuevo endpoint que usa cookies
                    const { data: refreshData } = await axios.get<ResponseRefreshTokenDto>(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/read/refresh-token`,
                        { withCredentials: true }
                    );

                    const newAccessToken = refreshData.access_token;
                    
                    // Actualizar Cache Global
                    AuthTokenCache.setToken(newAccessToken);

                    // Sincronizar Redux para no perder la info del usuario
                    const currentSession = boundStore.getState().auth.session;
                    if (currentSession) {
                        boundStore.dispatch(setSession({
                            ...currentSession,
                            accessToken: newAccessToken
                        }));
                    }

                    processQueue(null, newAccessToken);
                    
                    // Reintentar la petición original con el nuevo token
                    originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;
                    return this.axiosClient(originalRequest);

                } catch (refreshError) {
                    processQueue(refreshError, null);
                    this.handleLogout();
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
        );
    }

    private handleLogout() {
        // Limpiamos solo lo necesario para que useSession detecte la salida
        localStorage.removeItem('id_session'); 
        AuthTokenCache.clear();
        if (typeof window !== 'undefined') {
            window.location.href = '/mokka/auth';
        }
    }

    // Métodos Wrapper
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this.axiosClient.get<T>(url, config);
        return data;
    }

    async post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this.axiosClient.post<T>(url, body, config);
        return data;
    }

    async put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this.axiosClient.put<T>(url, body, config);
        return data;
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this.axiosClient.delete<T>(url, config);
        return data;
    }

    async patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
        const { data } = await this.axiosClient.patch<T>(url, body, config);
        return data;
    }
}

export const httpClient = HttpClientSingleton.getInstance();