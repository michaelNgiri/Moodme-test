import mongoose from "mongoose";
const schema = mongoose.Schema;



const ConfigSchema = new schema(
	{
		config: { type: String },
		value: { type: Boolean, default: false },
	}
);

export const Config = mongoose.model("Config", ConfigSchema);