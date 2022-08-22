import * as express from "express";
import { UserController } from "../controller";

const router = express.Router();

export default (app: express.Application) => {
	app.use("/api/user", router);

	// Get all users
	router.get("/", UserController.getAllUser);

	// Create new user
	router.post("/create", UserController.createUser);

	// Update user
	router.post("/:id/update", UserController.updateUser);
};
