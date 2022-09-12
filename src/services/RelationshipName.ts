import { AppDataSource } from "../data-source";
import { PidEntity, RelationEntity, UserEntity } from "../entity";
import { UserGender } from "../entity/User";

interface Data {
	id: string;
	name: string;
	mid: string;
	fid: string;
	gender: UserGender;
	dob: Date;
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
	if (user1.id === user2.id) {
		return {
			status: true,
			message: "Duplicate node",
		};
	}
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
		} else if (path1.depth === 1 && path2.depth === 1) {
			if (user1.dob > user2.dob) {
				return {
					status: true,
					message: `${user1.name} - ${user2.name}: Anh - em`,
				};
			} else {
				return {
					status: true,
					message: `${user2.name} - ${user1.name}: Anh - em`,
				};
			}
		} else if (path1.depth === path2.depth) {
			const _branch1 = await Relation.query(
				`SELECT * FROM user WHERE fid = ? and id in (SELECT ancestorId as id FROM relation WHERE descendantId = ?)`,
				[root, user1.id]
			);
			const _branch2 = await Relation.query(
				`SELECT * FROM user WHERE fid = ? and id in (SELECT ancestorId as id FROM relation WHERE descendantId = ?)`,
				[root, user2.id]
			);

			if (_branch1.dob > _branch2.dob) {
				return {
					status: true,
					message: `${user1.name} - ${user2.name}: Anh - em họ`,
				};
			} else {
				return {
					status: true,
					message: `${user2.name} - ${user1.name}: Anh - em họ`,
				};
			}
		} else if (path1.depth != path2.depth) {
			if (path1.depth - path2.depth === 1) {
				if (user1.gender === UserGender.MALE) {
					return {
						status: true,
						message: `${user1.name} - ${user2.name}: Cô - cháu họ   `,
					};
				}
			} else {
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

const handleCode: Function = (
	code: string,
	priorityUser: Data,
	user: Data,
	subCode?: string | number
): string => {
	switch (code) {
		case "01": {
			if (subCode) {
				return `Mẹ: ${priorityUser.name} - Con: ${user.name}`;
			} else {
				return `Cha: ${priorityUser.name} - Con: ${user.name}`;
			}
		}
		case "00": {
			if (subCode) {
				if (subCode === "1") {
					return `Chị: ${priorityUser.name} - Em: ${user.name}`;
				} else {
					return `Anh: ${priorityUser.name} - Em: ${user.name}`;
				}
			}
		}
		case "10": {
			if (subCode) {
				switch (subCode) {
					case "20": {
						return `Ông: ${priorityUser.name} - Cháu: ${user.name}`;
					}
					case "21": {
						return `Bà: ${priorityUser.name} - Cháu: ${user.name}`;
					}
					case "30": {
						return `Cụ: ${priorityUser.name} - Chắt: ${user.name}`;
					}
				}
			}
		}
		case "20": {
			return `Bác: ${priorityUser.name} - Cháu: ${user.name}`;
		}
		case "21": {
			if (subCode) {
				if (subCode === "1") {
					return `Cô: ${priorityUser.name} - Cháu: ${user.name}`;
				} else {
					return `Chú: ${priorityUser.name} - Cháu: ${user.name}`;
				}
			}
		}

		default:
			return;
	}
	return "";
};
const checkRelationship: Function = async (
	user1: Data,
	user2: Data
): Promise<string | void> => {
	const Relation = AppDataSource.getRepository(RelationEntity);
	const User = AppDataSource.getRepository(UserEntity);
	if (user1.fid === user2.id || user2.fid === user1.id) {
		if (user1.fid === user2.id) {
			return handleCode("01", user2, user1);
		} else {
			return handleCode("01", user1, user2);
		}
	}

	if (user1.mid === user2.id || user2.mid === user1.id) {
		if (user1.mid === user2.id) {
			return handleCode("01", user2, user1, "1");
		} else {
			return handleCode("01", user1, user2, "1");
		}
	}
	let _user1 = user1;
	let _user2 = user2;
	let subCode: string = "";
	if (
		user1.gender === UserGender.FEMALE ||
		user2.gender === UserGender.FEMALE
	) {
		if (user1.gender === UserGender.FEMALE) {
			let res = await Relation.query(
				`SELECT * FROM user WHERE id in (SELECT userId as id FROM pids WHERE pid = ?)`,
				[user1.id]
			);

			user1 = res[0];
		} else {
			user1 = null;
		}
		if (user2.gender === UserGender.FEMALE) {
			let res = await Relation.query(
				`SELECT * FROM user WHERE id in (SELECT userId as id FROM pids WHERE pid = ?)`,
				[user2.id]
			);
			user2 = res[0];
		} else {
			user2 = null;
		}
		if (user1 && user2) {
			subCode = "11";
		}
		if (!user1) {
			user1 = _user1;
		} else {
			subCode = "01";
		}
		if (!user2) {
			user2 = _user2;
		} else {
			subCode = "10";
		}
	}

	const res: Array<any> = await Relation.query(
		`SELECT fr.ancestorId as id from relation as fr WHERE fr.descendantId = ? AND fr.ancestorId IN (SELECT fr.ancestorId from relation as fr WHERE fr.descendantId = ?) ORDER BY depth LIMIT 1`,
		[user1.id, user2.id]
	);

	if (res.length === 0) {
		return "";
	}
	const root = res[0];
	const res1 = await Relation.query(
		`Select * from relation, user where ancestorId = ? and descendantId = ? and ancestorId = id`,
		[root.id, user1.id]
	);
	const path1 = res1[0];
	const res2 = await Relation.query(
		`Select * from relation, user where ancestorId = ? and descendantId = ? and ancestorId = id`,
		[root.id, user2.id]
	);
	const path2 = res2[0];
	let subCode1 = "0";
	let subCode2 = "0";

	if (subCode == "10") {
		let tmp = _user1;
		_user1 = user1;
		user1 = tmp;
		subCode1 = "1";
	}
	if (subCode == "01") {
		let tmp = _user2;
		_user2 = user2;
		user2 = tmp;
		subCode2 = "1";
	}
	if (subCode == "11") {
		let tmp = _user2;
		_user2 = user2;
		user2 = tmp;
		tmp = _user1;
		_user1 = user1;
		user1 = tmp;
		subCode1 = "1";
		subCode2 = "1";
	}
	if (path1.depth === 0 || path2.depth === 0) {
		if (path1.depth === 0) {
			return handleCode("10", user1, user2, path2.depth + subCode1);
		} else {
			return handleCode("10", user2, user1, path1.depth + subCode2);
		}
	}
	if (path1.depth === path2.depth) {
		if (path1.depth === 1) {
			if (user1.dob < user2.dob) {
				return handleCode("00", user1, user2, subCode1);
			} else {
				return handleCode("00", user2, user1, subCode2);
			}
		} else {
			console.log(root);

			var leaf1 = await User.query(
				`SELECT * FROM user WHERE fid = ? and id in (SELECT ancestorId as id FROM relation WHERE descendantId = ?)`,
				[root.id, user1.id]
			);
			var leaf2 = await User.query(
				`SELECT * FROM user WHERE fid = ? and id in (SELECT ancestorId as id FROM relation WHERE descendantId = ?)`,
				[root.id, user2.id]
			);
			leaf1 = leaf1[0];
			leaf2 = leaf2[0];
			console.log(leaf1);
			if (leaf1.dob > leaf2.dob) {
				return handleCode("00", user1, user2, subCode1);
			} else {
				return handleCode("00", user2, user1, subCode2);
			}
		}
	}

	// - Cô chú, bác: Xác định từ dob của ba và dob của id cô/chú/bác/gì

	if (path1.depth - path2.depth === 1 || path2.depth - path1.depth === 1) {
		if (path1.depth - path2.depth === 1) {
			let parent = await User.query(`Select * from user where id = ?`, [
				user1.fid,
			]);
			parent = parent[0];

			if (subCode2 === "1") {
				if (_user2.dob < parent.dob) {
					return handleCode("20", user2, user1, subCode2);
				} else {
					return handleCode("21", user2, user1, subCode2);
				}
			} else {
				if (user2.dob < parent.dob) {
					return handleCode("20", user2, user1, subCode2);
				} else {
					return handleCode("21", user2, user1, subCode2);
				}
			}
		} else {
			let parent = await User.query(`Select * from user where id = ?`, [
				user2.fid,
			]);
			parent = parent[0];

			if (subCode1 === "1") {
				if (_user1.dob < parent.dob) {
					return handleCode("20", user1, user2, subCode1);
				} else {
					return handleCode("21", user1, user2, subCode1);
				}
			} else {
				if (user1.dob < parent.dob) {
					return handleCode("20", user1, user2, subCode1);
				} else {
					return handleCode("21", user1, user2, subCode1);
				}
			}
		}
	}
	return "Default";
};
export default {
	checkRelationshipName,
	checkRelationship,
};
