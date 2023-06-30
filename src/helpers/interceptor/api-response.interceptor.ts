import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiResponseDto } from 'src/helpers/dto';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return new Observable((observer) => {
      next.handle().subscribe({
        next: (data) => {
          const response = {
            status: 200,
            message: 'Success',
            data: data instanceof ApiResponseDto ? data.data : data,
          };
          observer.next(response);
          observer.complete();
        },
        error: (err) => {
          Logger.error({err});
          const response = {
            status: 500,
            message: 'Internal Server Error',
            error: err.message || err,
          };
          observer.next(response);
          observer.complete();
        },
      });
    });
  }
}
