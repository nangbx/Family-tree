import { Request, Response } from "express";

async function getAll(req: Request, res: Response) {
	return res.json({
		message: "hello world!",
	});
}

export default { getAll };
