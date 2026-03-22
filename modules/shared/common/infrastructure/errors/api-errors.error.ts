import axios from "axios";
import { 
    ErrorPlatformMokka, 
    MultimediaErrorTypes, 
    OpenAIErrorTypes

 } from "../../domain/enums/errors-types";

export class ApiErrorPlatform extends Error {
  public readonly errorType: ErrorPlatformMokka;
  public readonly status: number;
  public readonly details?: MultimediaErrorTypes | OpenAIErrorTypes | string;
  public readonly timestamp: string;
  public readonly renovate?: boolean
  constructor(data: {
    message: string;
    errorType: ErrorPlatformMokka;
    status: number;
    details?: MultimediaErrorTypes | OpenAIErrorTypes  | string;
    timestamp?: string;
    renovate?: boolean 
  }) {
    
    super(data.message);
    

    this.name = 'ApiError';
    
    this.errorType = data.errorType;
    this.status = data.status;
    this.details = data.details;
    this.timestamp = data.timestamp || new Date().toISOString();
    this.renovate = data.renovate
    Object.setPrototypeOf(this, ApiErrorPlatform.prototype);
  }


  get isNSFW(): boolean {
    return this.details === OpenAIErrorTypes.NSFW || this.details === MultimediaErrorTypes.NSFW;
  }
  static isUnauthorized(error: unknown): boolean {
        if (error instanceof ApiErrorPlatform) {
            return error.status === 401
        }
        if (axios.isAxiosError(error)) {
            return error.response?.status === 401
        }
        return false
    }
  get shouldRenovate(): boolean {
    return this.status === 401 && this.renovate === true
  }
  
}