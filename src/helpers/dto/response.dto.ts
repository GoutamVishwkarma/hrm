export class ApiResponseDto {
    message: string | object;
    error?: string;
    status: number;
    data?: any;
    timestamp = new Date().toISOString();
  
    constructor(message: string | object , status: number, data?: any, error?: string) {
      this.message = message;
      this.status = status;
      this.data = data;
      this.error = error;
    }
  }
  