export class DateFormatter {
    
    private static toDate(date: string | Date): Date {
        return typeof date === 'string' ? new Date(date) : date;
    }

    /** Output: February 12, 2026 */
    static formatLong(date: string | Date): string {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(this.toDate(date));
    }

    /** Output: 02/12/26 */
    static formatShort(date: string | Date): string {
        return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format(this.toDate(date));
    }

    /** Output: Thursday, February 12 */
    static formatWithDay(date: string | Date): string {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        }).format(this.toDate(date));
    }

    /** Output: 2026-02-12 (Ideal para inputs o bases de datos) */
    static formatTechnical(date: string | Date): string {
        return this.toDate(date).toISOString().split('T')[0];
    }

    /** Output: 5:43 AM */
    static formatTime(date: string | Date): string {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(this.toDate(date));
    }
}