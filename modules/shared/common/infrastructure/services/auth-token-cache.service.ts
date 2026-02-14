export class AuthTokenCache {
    private static accessToken: string | null = null;

    static setToken(token: string): void {
        this.accessToken = token;
    }

    static getToken(): string | null {
        return this.accessToken;
    }

    static clear(): void {
        this.accessToken = null;
    }
}