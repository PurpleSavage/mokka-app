
import { ErrorPlatformMokka } from "../../domain/enums/errors-types";
import { ApiErrorPlatform } from "../../errors/api-errors.error";

export enum TypeErrorAlert{
    TOASTER='toast',
    ALERT_MODAL='alert'
}
export interface AlertModalFormat{
    typeAlert:TypeErrorAlert,
    title:string,
    message:string,
    details?:string,
   
}
export class SelectorModalbasedError{
    static selectModal(error:ApiErrorPlatform):AlertModalFormat{
        const ERROR_CONFIG_MAP: Record<ErrorPlatformMokka, { title: string; defaultMessage: string }> = {
            [ErrorPlatformMokka.UNKNOWN_ERROR]: {
                title: "Unexpected Error",
                defaultMessage: "Something went wrong on our end. Please try again later."
            },
            [ErrorPlatformMokka.GOOGLE_UNAUTHORIZED]: {
                title: "Session Expired",
                defaultMessage: "Your session has timed out. Please log in again."
            },
            [ErrorPlatformMokka.DATABASE_FAILED]: {
                title: "Connection Error",
                defaultMessage: "We are having trouble reaching our database."
            },
            [ErrorPlatformMokka.MOKKA_ERROR]: {
                title: "Mokka Core Error",
                defaultMessage: "An internal error occurred in the platform."
            },
            [ErrorPlatformMokka.GOOGLE_FAILED]: {
                title: "Authentication Failed",
                defaultMessage: "We couldn't verify your Google account."
            },
            
            [ErrorPlatformMokka.FILE_SIZE_ERROR]: { title: "File Too Large", defaultMessage: "The file exceeds the maximum limit." },
            [ErrorPlatformMokka.ELEVENLABS_ERROR]: { title: "Voice Generation Failed", defaultMessage: "Provider ElevenLabs is unavailable." },
            [ErrorPlatformMokka.REPLICATE_ERROR]: { title: "AI Model Error", defaultMessage: "The AI model failed to process the request." },
            [ErrorPlatformMokka.OPENAI_ERROR]: { title: "Text Generation Error", defaultMessage: "OpenAI couldn't generate the response." },
            [ErrorPlatformMokka.DOWNLOAD_ERROR]: { title: "Download Failed", defaultMessage: "We couldn't download the generated file." },
            [ErrorPlatformMokka.DOWNLOAD_TIMEOUT_ERROR]: { title: "Connection Timeout", defaultMessage: "The download took too long." },
            [ErrorPlatformMokka.HTTP_ERROR]: { title: "Network Error", defaultMessage: "A network request has failed." },
            }
        const toasters=[
            ErrorPlatformMokka.FILE_SIZE_ERROR,
            ErrorPlatformMokka.ELEVENLABS_ERROR,
            ErrorPlatformMokka.REPLICATE_ERROR,
            ErrorPlatformMokka.OPENAI_ERROR,
            ErrorPlatformMokka.DOWNLOAD_ERROR,
            ErrorPlatformMokka.DOWNLOAD_TIMEOUT_ERROR,
            ErrorPlatformMokka.HTTP_ERROR
        ]
        
        const config = ERROR_CONFIG_MAP[error.errorType] || ERROR_CONFIG_MAP[ErrorPlatformMokka.UNKNOWN_ERROR];
        if (toasters.includes(error.errorType)) {
            return {
                typeAlert: TypeErrorAlert.TOASTER,
                title: config.title, 
                message: error.message || config.defaultMessage,
            };
        }

        
        return {
            typeAlert: TypeErrorAlert.ALERT_MODAL,
            title: config.title,
            message: error.message || config.defaultMessage,
            details: typeof error.details === 'string' ? error.details : JSON.stringify(error.details)
        }
    }
    
}