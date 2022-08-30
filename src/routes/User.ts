import * as express from "express";
import { UserController } from "../controller";

const router = express.Router();

export default (app: express.Application) => {
	app.use("/api/user", router);

	// Get all users
	router.get("/", UserController.getAllUser);

	// Get user by id
	router.get("/:id", UserController.getUserById);

	// Create new user
	router.post("/create", UserController.createUser);

	// Update user
	router.put("/:id/update", UserController.updateUser);

	// Update user status
	router.put("/:id/updateStatus", UserController.updateStatus);
};
