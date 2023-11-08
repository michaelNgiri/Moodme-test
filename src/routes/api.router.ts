import * as express from "express";
import ApiController from "../api/api.controller"


const ApiRouter = express.Router()
	.get("/restaurants", ApiController.getRestaurants)

	;

export default ApiRouter;