export const LocalBdErrors={
    FAILED_SAVE:'FAILED_SAVE_SOURCE',
    FAILED_GET:'FAILED_GET_SOURCE',
    FILE_NOT_VALID:'FILE_NOT_VALID',
    FIELD_NOT_VALID:'FIELD_NOT_VALID'
} as const


export type LocalBdErrorsType = typeof LocalBdErrors[keyof typeof LocalBdErrors]