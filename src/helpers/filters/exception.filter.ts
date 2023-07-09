import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
    HttpStatus
  } from '@nestjs/common';
import { ApiResponseDto } from '../dto';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger : Logger= new Logger(AllExceptionsFilter.name);
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      let status = exception.getStatus();
      let message = exception.getResponse() as string;
       
      this.logger.error(typeof exception);
      this.logger.error(exception.getResponse());
      if (exception.getResponse() && exception.getResponse().message instanceof Array ) {
        const validationErrors = exception.getResponse().message as string[];
        this.logger.error(validationErrors);
        message = this.getValidationErrorMessage(validationErrors);
        status = HttpStatus.BAD_REQUEST;
      }
      if (exception instanceof HttpException) 
      this.logger.error("http",exception.getResponse());
      const error = (exception.getResponse() && exception.getResponse().error) ? (exception.error || exception.toString()) : undefined;
      const apiResponse = new ApiResponseDto(message, status, undefined, error);
      this.logger.error({apiResponse});
      response.status(status).json(apiResponse);
    }
    private getValidationErrorMessage(errors: string[]): string {
        return errors.join(', ');
      }
  }
  