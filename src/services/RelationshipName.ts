import { AppDataSource } from "../data-source";
import { PidEntity, RelationEntity } from "../entity";
import { UserGender } from "../entity/User";

interface Data {
	id: string;
	name: string;
	mid: string;
	fid: string;
	gender: UserGender;
}
interface Response {
	status: boolean;
	message: string;
}
// Check parent-child relationship
const checkRelationshipParentChildName: Function = (
	user1: Data,
	user2: Data
): Response => {
	if (user1.fid === user2.id || user2.fid === user1.id) {
		// Relationship father - child
		if (user1.fid === user2.id)
			return {
				status: true,
				message: `${user2.name} - ${user1.name}: Cha - con`,
			};
		else
			return {
				status: true,
				message: `${user1.name} - ${user2.name}: Cha - con`,
			};
	}
	if (user1.mid === user2.id || user2.mid === user1.id) {
		// Relationship mother - child
		if (user1.mid === user2.id)
			return {
				status: true,
				message: `${user2.name} - ${user1.name}: Mẹ - con`,
			};
		else
			return {
				status: true,
				message: `${user1.name} - ${user2.name}: Mẹ - con`,
			};
	}
	return {
		status: false,
		message: "",
	};
};

// Check husband-wife relationship
const checkHusbandWifeRelationship = async (
	user1: Data,
	user2: Data
): Promise<Response> => {
	const Pids = AppDataSource.getRepository(PidEntity);
	let res: any;

	res = await Pids.query(`Select * from pids where userId = ? and pid = ?`, [
		user1.id,
		user2.id,
	]);
	if (res.length !== 0) {
		return {
			status: true,
			message: `${user1.name} - ${user2.name}: Vợ chồng`,
		};
	} else {
		return {
			status: false,
			message: "",
		};
	}
};

const checkOtherRelationship = async (
	user1: Data,
	user2: Data
): Promise<Response> => {
	const Relation = AppDataSource.getRepository(RelationEntity);
	const res: Array<any> = await Relation.query(
		`SELECT fr.ancestorId as id from relation as fr WHERE fr.descendantId = ? AND fr.ancestorId IN (SELECT fr.ancestorId from relation as fr WHERE fr.descendantId = ?)`,
		[user1.id, user2.id]
	);
	if (res.length === 0) {
		return {
			status: false,
			message: "",
		};
	} else {
		const root = res[0].id;
		const res1 = await Relation.query(
			`Select * from relation where ancestorId = ? and descendantId = ?`,
			[root, user1.id]
		);
		const path1 = res1[0];
		const res2 = await Relation.query(
			`Select * from relation where ancestorId = ? and descendantId = ?`,
			[root, user2.id]
		);
		const path2 = res2[0];

		if (path1.depth === 0 || path2.depth === 0) {
			if (path1.depth === 0) {
				const depth = path2.depth;
				switch (depth) {
					case 1:
						return {
							status: true,
							message: `${user1.name} - ${user2.name}: Cha - con`,
						};
					case 2:
						return {
							status: true,
							message: `${user1.name} - ${user2.name}: Ông - cháu`,
						};
					case 3:
						return {
							status: true,
							message: `${user1.name} - ${user2.name}: Kị - chắt`,
						};
				}
			} else {
				const depth = path2.depth;
				switch (depth) {
					case 1:
						return {
							status: true,
							message: `${user2.name} - ${user1.name}: Cha - con`,
						};
					case 2:
						return {
							status: true,
							message: `${user2.name} - ${user1.name}: Ông - cháu`,
						};
					case 3:
						return {
							status: true,
							message: `${user2.name} - ${user1.name}: Kị - chắt`,
						};
				}
			}
		}

		return {
			status: true,
			message: "",
		};
	}
};
const checkRelationshipName: Function = async (
	user1: Data,
	user2: Data
): Promise<string | void> => {
	try {
		let res: Response;
		if ((res = checkRelationshipParentChildName(user1, user2)).status) {
			return res.message;
		}
		if ((res = await checkHusbandWifeRelationship(user1, user2)).status) {
			return res.message;
		}
		if ((res = await checkOtherRelationship(user1, user2)).status) {
			return res.message;
		}
		return "No relationship";
	} catch (e) {
		console.log(e);
	}
};
export default {
	checkRelationshipName,
};
