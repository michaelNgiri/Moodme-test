import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";

class ApiController{
    async getRestaurants(req: Request, res: Response) { 
        console.log("Api controller");
        res.send({status:200, message: "data fetched", data: await Restaurant.find().limit(100)})
    }
}

export default new ApiController();