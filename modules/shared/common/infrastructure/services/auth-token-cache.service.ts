export class AuthTokenCache {
    private static accessToken: string | null = null
    private static refreshing: boolean = false  // 👈

    static setToken(token: string): void {
        this.accessToken = token
    }

    static getToken(): string | null {
        return this.accessToken
    }

    static clear(): void {
        this.accessToken = null
    }

    static setRefreshing(value: boolean): void {
        this.refreshing = value
    }

    static isRefreshing(): boolean {
        return this.refreshing
    }
}