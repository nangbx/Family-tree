import { Request, Response } from "express";
import { ErrorHandling, UserService } from "../services";

const getRelationshipName = async (req: Request, res: Response) => {
	const { user1, user2 } = req.body;
	try {
		const _user1 = await UserService.getById(user1);
		const _user2 = await UserService.getById(user2);
		if (!_user1 || !_user2) {
			return res.status(400).json({
				message: "Not found!",
			});
		}
		console.log(_user1);
		console.log(_user2);
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};

export default {
	getRelationshipName,
};
