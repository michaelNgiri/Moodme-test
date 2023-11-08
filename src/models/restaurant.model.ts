import mongoose from "mongoose";
const schema = mongoose.Schema;
import restaurantList from "../data/restaurants"
import { Config } from "./config.model";


const AddressSchema = new schema(
	{
		building: { type: String },
		street: { type: String }
	}
);
const GradesSchema = new schema(
	{
		date: { type: Date },
		grade: { type: String },
		score: { type: String }
	}
);

const RestaurantSchema= new schema(
	{
		address: { type: AddressSchema },
		cuisine: String,
		grades: [GradesSchema],
		name: { type: String, required: true },
		restaurant_id: { type: String, required: true }
	}
);

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);


Restaurant.init().then(async () => {
	const dbImported = await Config.findOne({ config: "db_imported", value: true });
	if (!dbImported) {
		console.log("DB import started");
		await restaurantList.forEach(async (restaurant) => {
			let cleanedGrades: { grade: string; score: number | null; date: string; }[] = [];
			restaurant["grades"].forEach(grade => {
				const intGrade = { grade: grade["grade"], score: grade["score"], date: grade["date"]["$date"] };
				cleanedGrades.push(intGrade);
				console.log(grade["date"]["$date"]);
			});
			console.log("grade:", cleanedGrades);
			await Restaurant.findOneAndUpdate({ name: restaurant["name"] }, { address: restaurant["address"], cuisine: restaurant["cuisine"], grades: cleanedGrades, name: restaurant["name"], restaurant_id: restaurant["restaurant_id"], }, { upsert: true, new: true, setDefaultsOnInsert: true }).then((newRestaurant) => {
			});
		}); // initialize db

		// create record to prevent db initialization if already ddone
		await Config.create({ config: "db_imported", value: true });
		console.info("===============================DB initializization completed=============================");

	} else {
		console.log("DB already initialized")
	}

});
