import { 
    ErrorPlatformMokka, 
    MultimediaErrorTypes, 
    OpenAIErrorTypes

 } from "../domain/enums/errors-types";

export class ApiErrorPlatform extends Error {
  public readonly errorType: ErrorPlatformMokka;
  public readonly status: number;
  public readonly details?: MultimediaErrorTypes | OpenAIErrorTypes | string;
  public readonly timestamp: string;

  constructor(data: {
    message: string;
    errorType: ErrorPlatformMokka;
    status: number;
    details?: MultimediaErrorTypes | OpenAIErrorTypes  | string;
    timestamp?: string;
  }) {
    
    super(data.message);
    

    this.name = 'ApiError';
    
    this.errorType = data.errorType;
    this.status = data.status;
    this.details = data.details;
    this.timestamp = data.timestamp || new Date().toISOString();
    Object.setPrototypeOf(this, ApiErrorPlatform.prototype);
  }


  get isNSFW(): boolean {
    return this.details === OpenAIErrorTypes.NSFW || this.details === MultimediaErrorTypes.NSFW;
  }

  
}