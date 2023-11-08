	/**
	 * Manage error messages
	 *
	 */
export enum HttpStatusCode {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER = 500,
}

export class BaseError extends Error {
	public readonly httpCode: HttpStatusCode;
	public readonly isOperational: boolean;

	constructor(httpCode: HttpStatusCode, message: string, isOperational: boolean) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.httpCode = httpCode;
		this.isOperational = isOperational;

		Error.captureStackTrace(this);
	}
}

//free to extend the BaseError
export class BusinessError extends BaseError {
	constructor(httpCode = HttpStatusCode.INTERNAL_SERVER, message = "internal server error",
		isOperational = true) {
		super(httpCode, message, isOperational);
	}
}