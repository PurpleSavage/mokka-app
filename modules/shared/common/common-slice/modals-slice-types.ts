export enum TypeErrorAlert{
    TOASTER='toast',
    ALERT_MODAL='alert'
}
export interface AlertModalConfig{
    typeError:TypeErrorAlert,
    title?:string,
    message:string,
    details?:string
}