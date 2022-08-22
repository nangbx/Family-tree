import { Application, Router } from "express";
import { RelationController } from "../controller";

const router = Router();

export default (app: Application) => {
	app.use("/api/relation", router);

	router.get("/:id", RelationController.getRelation);
};
