import AppLogger from "./app.logger";
import {BaseError} from "./BaseError";
import {Request, Response, NextFunction} from "express";

	/**
	 * 
	 * This is an error handler that will be called when a request error occurs
	 *
	 */
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