import { Request, Response } from "express";
import { ErrorHandling, RoleService, UserService } from "../services";

const addRoleForUser = async (req: Request, res: Response) => {
	const { user, role } = req.body;
	try {
		const _user = await UserService.getById(user);
		if (!_user) {
			return res.status(400).json({
				message: "Not found!",
			});
		}
		return res.status(200).json({
			message: await RoleService.save({ user, role }),
		});
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};
const updateRole = async (req: Request, res: Response) => {
	const { user, role } = req.body;
	try {
		const _user = await UserService.getById(user);
		if (!_user) {
			return res.status(400).json({
				message: "Not found!",
			});
		}
		return res.status(200).json({
			message: await RoleService.update({ user, role }),
		});
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};

export default {
	addRoleForUser,
	updateRole,
};
