import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";

class ApiController{

    /**
	 * Process data for finding listing and formart response for the user
	 * @param req.query
	 *
	 */
    async getRestaurants(req: Request, res: Response) { 
        // console.log("API service, fetching paginated data");
        try {
            const query = req.query;

            const searchParams: any = {};

            if (query.name) {
                searchParams["name"] = query.name;
            }

            if (query.restaurant_id) {
                searchParams["restaurant_id"] = query.restaurant_id;
            }

            if (query.cuisine) {
                searchParams["cuisine"] = query.cuisine;
            }

            console.log(searchParams);

            // sort by date of creation
            let sort = "-createdAt";
	

            const limit = Number(query.limit) || 100;
            const page = Number(query.page) || 1;

            const skip = (page - 1) * limit;

            const listings = await Restaurant.find(searchParams)
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .exec();
            
       
            // const count = await Restaurant.estimatedDocumentCount();
            // currently, mongoose doesn't support being able to return the paginated response with a total count in same query
            // so if the count is less than pagination limit, it is assumed to be correct and no further query is required, if not, we have no other choice than to run another query;
            // the if statement is to ensure that the second query runs only when its necessary.
            let count = listings.length;
            if (count == limit) {
                count = await Restaurant.find(searchParams).count();
            }

            res.status(200).json({ status: 200, message: "data fetched", perPage: limit, currentPage: page, totalPages: Math.ceil(count / limit), Total:count, data: listings})
        } catch (e) { 
            res.send({ status: 500, message: "error occurred", e });
            console.log(e);
        }
       
       
    }


}

export default new ApiController();