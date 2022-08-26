import { Application, Router } from "express";
import { RelationController, UserController } from "../controller";

const router = Router();

export default (app: Application) => {
	app.use("/api/relation", router);

	// Get tree by root id
	router.get("/:id", RelationController.getRelation);

	// Create mother-child relationship
	router.post("/midRelation", RelationController.createMotherChildRelation);

	// Create husband-wife relationship
	router.post("/pidsRelation", RelationController.createHusbandWifeRelation);

	// Create parent-child relationship
	router.post("/fidRelation", RelationController.createParentChildRelation);

	// Delete mother-child relationship
	router.delete("/midRelation", RelationController.deleteMotherChildRelation);

	// Delete parent-child relationship
	router.delete("/fidRelation", RelationController.deleteParentChildRelation);

	// Delete husband-wife relationship
	router.delete("/pidsRelation", RelationController.deltePidRelation);
};
