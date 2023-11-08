import mongoose from "mongoose";
const schema = mongoose.Schema;


/**
	 * This model will be used to store key value pairs for app configuration
	 * @param req.query
	 *
	 */
const ConfigSchema = new schema(
	{
		config: { type: String },
		value: { type: Boolean, default: false },
	}
);

export const Config = mongoose.model("Config", ConfigSchema);