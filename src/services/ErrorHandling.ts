import { Response } from "express";
export default (res: Response, error: any) => {
	let ERROR = JSON.parse(JSON.stringify(error));

	const { name, code } = ERROR;

	console.log("Error_Logging: ", ERROR);

	switch (code) {
		case "ER_DUP_ENTRY":
			return res.status(404).json({
				message: ERROR.sqlMessage,
			});
	}
	switch (name) {
		case "EntityNotFound":
			return res.status(404).json({
				...ERROR,
			});
			break;
		case "JsonWebTokenError":
			return res.status(400).json({
				...ERROR,
				name: "Unauthenticated",
			});
			break;
		default:
			return res.status(500).json({
				...ERROR,
			});
	}
};
