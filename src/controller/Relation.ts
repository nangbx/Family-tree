import { Response } from "express";
import { Request } from "express";
import { UserEntity } from "../entity";
import { ErrorHandling, RelationService, UserService } from "../services";

export enum Relation {
	PARENT = "parent",
	WIFE = "wife",
}

const getRelation = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const root = await UserService.getById(id);
		if (!root) {
			return res.status(404).json({
				message: "Not found!",
			});
		}
		return res.status(200).json(await RelationService.getTree({ id }));
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};

const createMotherChildRelation = async (req: Request, res: Response) => {
	const { mother, child } = req.body;
	try {
		const Mother = await UserService.getById(mother);
		const Child = await UserService.getById(child);
		if (!Mother || !Child) {
			return res.status(400).json({
				message: "Not found!",
			});
		}
		return res.status(200).json(
			await UserService.createMidRelation({
				mother: Mother,
				child: Child,
			})
		);
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};
const createHusbandWifeRelation = async (req: Request, res: Response) => {
	const { user1, user2 } = req.body;
	try {
		const User1 = await UserService.getById(user1);
		const User2 = await UserService.getById(user2);
		if (!User1 || !User2) {
			return res.status(400).json({
				message: "Not found!",
			});
		}
		return res.status(200).json(
			await UserService.createPidsRelation({
				node1: User1,
				node2: User2,
			})
		);
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};

const createParentChildRelation = async (req: Request, res: Response) => {
	const { parent, child } = req.body;
	try {
		const Parent = await UserService.getById(parent);
		const Child = await UserService.getById(child);
		if (!Parent || !Child) {
			return res.status(400).json({
				message: "Not found!",
			});
		}
		await UserService.createFidRelation({
			parent: Parent,
			child: Child,
		});
		return res.status(200).json(
			await RelationService.createFidRelation({
				parent: parent,
				child: child,
			})
		);
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};
const deleteMotherChildRelation = async (req: Request, res: Response) => {
	const { mother, child } = req.body;
	try {
		const Mother = await UserService.getById(mother);
		const Child = await UserService.getById(child);
		if (!Mother || !Child) {
			return res.status(400).json({
				message: "Not found!",
			});
		}
		if (Child["mid"] !== Mother.id) {
			return res.status(400).json({
				message: "No relationship!",
			});
		}
		return res
			.status(200)
			.json(await UserService.deleteMidRelation({ child: Child }));
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};

const deleteParentChildRelation = async (req: Request, res: Response) => {
	const { child, parent } = req.body;
	try {
		const Child = await UserService.getById(child);
		const Parent = await UserService.getById(parent);
		if (!Child || !Parent) {
			return res.status(400).json({
				message: "Not found!",
			});
		}
		if (Child.fid !== Parent.id) {
			return res.json({
				message: "Not relationship",
			});
		}
		await UserService.deleteFidRelation({ child: Child });
		return res.status(200).json(
			await RelationService.deleteFidRelation({
				parent,
				child,
			})
		);
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};
const deltePidRelation = async (req: Request, res: Response) => {
	const { user1, user2 } = req.body;
	try {
		const User1 = await UserService.getById(user1);
		const User2 = await UserService.getById(user2);
		if (!User1 || !User2) {
			return res.status(400).json({
				message: "Not found!",
			});
		}

		return res
			.status(200)
			.json(
				await UserService.deletePidRelation({ node1: user1, node2: user2 })
			);
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};

export default {
	getRelation,
	createMotherChildRelation,
	createHusbandWifeRelation,
	createParentChildRelation,
	deleteMotherChildRelation,
	deleteParentChildRelation,
	deltePidRelation,
};
