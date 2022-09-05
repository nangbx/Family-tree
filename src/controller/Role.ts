import { Request, Response } from "express";
import { ErrorHandling } from "../services";

const addRoleForUser = async (req: Request, res: Response) => {
	const { id, role } = req.body;
	try {
		return res.json({ message: "Hello world!" });
	} catch (e) {
		console.log(e);
		ErrorHandling(res, e);
	}
};

export default {
	addRoleForUser,
};
