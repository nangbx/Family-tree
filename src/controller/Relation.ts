import { Response } from "express";
import { Request } from "express";

const getAllRelation = async (req: Request, res: Response) => {
	return res.json({
		message: "Success",
	});
};
export default { getAllRelation };
