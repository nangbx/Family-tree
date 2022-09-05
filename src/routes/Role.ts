import * as Express from "express";
import { RoleController } from "../controller";

const router = Express.Router();

export default (app: Express.Application) => {
	app.use("/api/role", router);

	router.post("/add", RoleController.addRoleForUser);

	router.put("/update", RoleController.updateRole);

	router.get("/:user", RoleController.getRoleById);
};
