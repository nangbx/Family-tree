import { Application, Router } from "express";
import { RelationshipNameController } from "../controller";

const router = Router();
export default (app: Application) => {
	app.use("/api/name", router);

	router.get("/", RelationshipNameController.getRelationshipName);
};
