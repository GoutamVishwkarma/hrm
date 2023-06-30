import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
    HttpStatus
  } from '@nestjs/common';
import { ApiResponseDto } from '../dto';
import { ValidationError } from 'class-validator';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
 
      let status = exception.getStatus();
      let message = exception.getResponse() as string;
  
      if (exception.getResponse() instanceof Array) {
        const validationErrors = exception.getResponse() as ValidationError[];
        message = this.getValidationErrorMessage(validationErrors);
        status = HttpStatus.BAD_REQUEST;
      }
  
  
      const error = exception instanceof Error ? (exception.message || exception.toString()) : undefined;


  
      const apiResponse = new ApiResponseDto(message, status, undefined, error);

      response.status(status).json(apiResponse);
    }
    private getValidationErrorMessage(errors: ValidationError[]): string {
        const errorMessages = errors.map((error) => {
          const constraints = Object.values(error.constraints);
          return constraints.join(', ');
        });
    
        return errorMessages.join(', ');
      }
  }
  