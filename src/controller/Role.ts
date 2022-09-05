import { Request, Response } from "express";
import { ErrorHandling, RoleService, UserService } from "../services";

const getRoleById = async (req: Request, res: Response) => {
	const { user } = req.params;
	try {
		return res.json(await RoleService.getById({ user }));
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};

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
			message: await RoleService.save({ user: _user, role }),
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
		console.log(_user);
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
	getRoleById,
};
