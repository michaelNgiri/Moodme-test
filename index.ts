
import express, { Express, Request, Response , Application, NextFunction} from 'express';
import dotenv from 'dotenv';
import restaurants from "./src/data/restaurants"
import requestLogger from "./src/utils/request.logger";
import cors from 'cors';
import morgan from "morgan";
import AppLogger from "./src/utils/app.logger";
import { BaseError } from './src/utils/BaseError';
import cache from "ts-cache-mongoose";
import mongoose from "mongoose";
import { createServer } from "http";

// import function routs
import ApiRouter from "./src/routes/api.router"


//For env File 
dotenv.config();

// inititalize the application
const app: Application = express();
const port = process.env.PORT || 8000;

const logger = morgan;
app.use(cors({origin: "*"}));
app.use(requestLogger);
app.use(logger("dev"));
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	AppLogger.error("In global error handler");

	if (err instanceof BaseError) {
		res.status(err.httpCode).send({
			success: false,
			msg: err.message,
		});
	} else {
		res.status(500).send(err.message);
	}

	next(err);
});

const prefix = "/api/v1";
app.use(prefix, ApiRouter);

process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
	AppLogger.error("Unhandled rejection, rethrowing...", reason);
	throw reason;
});

process.on("uncaughtException", (error: Error) => {
	AppLogger.error("Uncaught exception", error);
	//Todo: restart server
});



app.get('/', (req: Request, res: Response) => {
  const count = restaurants.length;
  res.send('Welcome to Express & TypeScript Server, you have ' + count + 'restautrants, the first restaurant is ' +restaurants[0].name);
});


// set the port
const {PORT} = process.env || 5000;
app.set("port", PORT);


// create the application server 
const httpServer = createServer(app);
httpServer.listen(PORT);
httpServer.on("unhandledRejection", function (req, res, route, err) {
	if (!res.headersSent) {
		return res.send(500, {ok: false});
	}
	res.write("\n");
	res.end();
});

// Initialize connection to mongoDB server
httpServer.on("listening", () => {
	console.info(`Node server listening on port: ${PORT}`);
	console.log("connecting to database, please wait...");
	const mongoURI = process.env.MONGODB_URI;
	mongoose
		.connect(
			String(mongoURI)
		)
		.then((info: any) => {
			if (info) {
				console.log("info:" + info);
			}
			console.info("database connection established");
		})
		.catch((err: string) => {
			console.log(`err: ${err}`);
			console.warn("database connection failed, please check your network!");
		});
	// use cache to prevent long request times
	cache.init(mongoose, {
		engine: "memory",
	});
});