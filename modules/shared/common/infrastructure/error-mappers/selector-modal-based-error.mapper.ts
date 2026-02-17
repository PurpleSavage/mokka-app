import { AlertModalConfig, TypeErrorAlert} from "../../common-slice/modals-slice-types";
import { ErrorPlatformMokka } from "../../domain/enums/errors-types";
import { ApiErrorPlatform } from "../../errors/api-errors.error";

export class SelectorModalbasedError{
    static selectModal(error:ApiErrorPlatform):AlertModalConfig{
        const toasters=[
            ErrorPlatformMokka.FILE_SIZE_ERROR,
            ErrorPlatformMokka.ELEVENLABS_ERROR,
            ErrorPlatformMokka.REPLICATE_ERROR,
            ErrorPlatformMokka.OPENAI_ERROR,
            ErrorPlatformMokka.DOWNLOAD_ERROR,
            ErrorPlatformMokka.DOWNLOAD_TIMEOUT_ERROR,
            ErrorPlatformMokka.HTTP_ERROR
        ]
        // const modals=[
        //     ErrorPlatformMokka.GOOGLE_UNAUTHORIZED,
        //     ErrorPlatformMokka.DATABASE_FAILED,
        //     ErrorPlatformMokka.GOOGLE_FAILED,
        //     ErrorPlatformMokka.MOKKA_ERROR,
        //     ErrorPlatformMokka.UNKNOWN_ERROR
        // ]

        if(toasters.includes(error.errorType)){
            return {
                typeError:TypeErrorAlert.TOASTER,
                message:error.message
            }
        }
        return {
            typeError:TypeErrorAlert.ALERT_MODAL,
            message:error.message,
            title:'Oops, it seems an error has occurred',
            details:error.details
        }
    }
}