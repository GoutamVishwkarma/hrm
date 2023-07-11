import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {ApiResponseDto} from '../dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private logger = new Logger(AllExceptionsFilter.name);
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let status: number;
		let message: string | object;
		this.logger.error(exception);
		this.logger.error({exception});

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const response: any = exception.getResponse();
			if (response.message instanceof Array) message = response.message.join(', ');
			else message = response.message as string;
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			message = exception.message || 'Internal server error';
		}
		const errorResponse = {
			statusCode: status,
			message,
			timestamp: new Date().toISOString(),
			path: request.url,
		} as ApiResponseDto;

		response.status(status).json(errorResponse);
	}
}
