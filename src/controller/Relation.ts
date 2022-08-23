import { Response } from "express";
import { Request } from "express";
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
		return await RelationService.getTree({ id });
	} catch (e) {
		ErrorHandling(res, e);
	}
};
export default { getRelation };
