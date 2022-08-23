import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";
import * as cors from "cors";
import { RelationRouter, UserRouter } from "./routes";

AppDataSource.initialize()
	.then(async () => {
		// create express app
		dotenv.config();
		const app = express();
		const port = process.env.PORT;
		app.use(cors());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));

		// Routes
		UserRouter(app);
		RelationRouter(app);
		// start express server
		app.listen(port);

		// insert new users for test
		// await AppDataSource.manager.save(
		// 	AppDataSource.manager.create(User, {
		// 		firstName: "Timber",
		// 		lastName: "Saw",
		// 		age: 27,
		// 	})
		// );

		// await AppDataSource.manager.save(
		// 	AppDataSource.manager.create(User, {
		// 		firstName: "Phantom",
		// 		lastName: "Assassin",
		// 		age: 24,
		// 	})
		// );

		console.log(
			`Express server has started on port ${port}. Open http://localhost:${port} to see results`
		);
	})
	.catch((error) => console.log({ error }));
