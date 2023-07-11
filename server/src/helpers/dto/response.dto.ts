export class ApiResponseDto {
	message: string | object;
	error?: string;
	statusCode: number;
	data?: any;
	path?: string;
	timestamp = new Date().toISOString();

	constructor(message: string | object, statusCode: number, data?: any, error?: string) {
		this.message = message;
		this.statusCode = statusCode;
		this.data = data;
		this.error = error;
	}
}

export interface ApiResponse<T> {
	message: string | object;
	error?: string;
	statusCode: number;
	data?: T;
	path?: string;
	timestamp: string;
}
