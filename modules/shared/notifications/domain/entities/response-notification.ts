import { ResponseDataSocket } from "@/modules/shared/common/application/dtos/responses/socket-response.dto"

export type SocketReadyData<T> = Pick<ResponseDataSocket<T>, 'jobId' | 'status' | 'message' | 'entity' | 'creditsUpdate'| 'createDate'>
export type SocketErrorData = Pick<ResponseDataSocket, 'jobId' | 'status' | 'error'| 'errorType'| 'details' | 'createDate'>