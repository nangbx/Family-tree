import { UserSchema } from "./../validationSchema/index";
import { Request, Response } from "express";
import { ErrorHandling, RelationService, UserService } from "../services";

const getAllUser = async (req: Request, res: Response) => {
	try {
		const users = await UserService.getAll();
		return res.status(200).json({
			users,
		});
	} catch (e) {
		ErrorHandling(res, e);
	}
};

const createUser = async (req: Request, res: Response) => {
	const { name, gender, image = "", phone, email, password } = req.body;
	try {
		const isValid = UserSchema.isValidSync({
			user: {
				name,
				gender,
				image,
				phone,
				email,
				password,
			},
		});
		if (isValid) {
			const user = await UserService.save({
				name,
				gender,
				image,
				phone,
				email,
				password,
			});
			const id = user.id;
			await RelationService.save({ id });
			return res.status(200).json(user);
		}
	} catch (e) {
		ErrorHandling(res, e);
	}
};

const updateUser = async (req: Request, res: Response) => {
	const { name, gender, image = "", phone, email, password } = req.body;
	const { id } = req.params;
	try {
		const isValid = UserSchema.isValidSync({
			user: {
				name,
				gender,
				image,
				phone,
				email,
				password,
			},
		});
		if (isValid) {
			const user = await UserService.update(id, {
				name,
				gender,
				image,
				phone,
				email,
				password,
			});

			return res.status(200).json(user);
		}
	} catch (e) {
		ErrorHandling(res, e);
	}
};

export default { getAllUser, createUser, updateUser };
