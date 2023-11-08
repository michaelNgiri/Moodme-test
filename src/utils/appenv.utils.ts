import dotenv from "dotenv";

	/**
	 * 
	 * Manage the application environement here!
	 *
	 */
class AppEnv {
	constructor() {
		dotenv.config();
	}

	public isProdEnvironment  ()  {
		return process.env.NODE_ENV == "production";
	}

	public isTestEnvironment  () {
		return process.env.NODE_ENV == "test";
	}

	public isDevEnvironment () {
		return !this.isProdEnvironment();
	}
}

export default new AppEnv();