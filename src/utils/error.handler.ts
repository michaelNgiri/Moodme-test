import AppLogger from "./app.logger";
import {BaseError} from "./BaseError";
import {Request, Response, NextFunction} from "express";

class ErrorHandlerUtils {
	public async handleError(err: Error) {
		await AppLogger.error(
			"Error message from the centralized error-handling component",
			err,
		);
	}

	public isTrustedError(error: Error) {
		if (error instanceof BaseError) {
			return error.isOperational;
		}
		return false;
	}
}
export default new ErrorHandlerUtils();