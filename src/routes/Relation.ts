import { Application, Request, Router, Response } from "express";
import { RelationController } from "../controller";

const router = Router();

export default (app: Application) => {
	app.use("/api/relation", router);

	router.get("/", RelationController.getAllRelation);
};
