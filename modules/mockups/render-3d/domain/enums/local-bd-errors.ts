export const LocalBdErrors={
    FAILED_SAVE:'FAILED_SAVE_SOURCE',
    FAILED_GET:'FAILED_GET_SOURCE'
} as const


export type LocalBdErrorsType = typeof LocalBdErrors[keyof typeof LocalBdErrors]