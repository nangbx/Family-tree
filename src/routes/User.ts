import * as express from "express";
import { UserController } from "../controller";

const router = express.Router();

export default (app: express.Application) => {
	app.use("/api/user", router);

	router.get("/", UserController.getAll);
};
