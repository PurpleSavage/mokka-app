
export interface AlertModalConfig{
    title:string,
    message:string,
    details?:string,
    isVisible:boolean,
    type: 'error' | 'success' | 'warning' | 'info';
}