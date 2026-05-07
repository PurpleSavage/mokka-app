export const StatusQueue={
    PROCESSING:'processing',
    FAILED:'failed',
    COMPLETED:'completed'
} as const 

export type StatusQueueType= typeof StatusQueue[keyof typeof StatusQueue]