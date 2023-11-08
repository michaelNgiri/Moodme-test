import * as express from "express";
import ApiController from "../api/api.controller"


const ApiRouter = express.Router()
	.get("/search", ApiController.search)

	;

export default ApiRouter;