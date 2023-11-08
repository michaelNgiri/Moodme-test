import dotenv from "dotenv";

class AppEnv {
	constructor() {
		dotenv.config();
	}

	public getMailGunPrivateApikey (): string {
		return process.env.MAILGUN_PRIVATE_KEY ?? "";
	}

	public getMailGunPublicApikey (): string {
		return process.env.MAILGUN_PUBLIC_KEY ?? "";
	}

	public getMailGunDomain (): string {
		if(this.isDevEnvironment()){
			return process.env.MAILGUN_DOMAIN_NAME_SANDBOX ?? "";
		}

		return process.env.MAILGUN_DOMAIN_NAME ?? "";
	}

	public getMailGunSender() : string {
		return `WheelMax Support: <support@${this.getMailGunDomain()}>`; //process.env.MAILGUN_URL ?? "";
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