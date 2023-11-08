import { string } from "joi";

export interface PaginatedDataResponse {
	data?: any
	perPage: number,
	currentPage: number,
	totalPages: number,
	count: number
}

export interface DataResponse {
	data?: Record<string, unknown> | unknown
	msg: string,
	status: number,
	success?: boolean,
	error?: Error
}