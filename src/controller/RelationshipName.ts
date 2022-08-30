import { Request, Response } from "express";

const getRelationshipName = async (req: Request, res: Response) => {
	return res.json({
		message: "Hello world!",
	});
};

export default {
	getRelationshipName,
};
