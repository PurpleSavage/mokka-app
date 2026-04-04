import {  LocalBdErrorsType } from "../../domain/enums/local-bd-errors";

export class Mockups3DError extends Error{
    public readonly errorType: LocalBdErrorsType;
      public readonly status: number;
      public readonly details: string;

      constructor(data: {
        message: string;
        errorType: LocalBdErrorsType;
        status: number;
        details:  string;
      }) {
        
        super(data.message);
        
    
        this.name = 'BdError';
        
        this.errorType = data.errorType;
        this.status = data.status;
        this.details = data.details;

     
      }

}