interface Data {
	id: string;
	name: string;
	mid: string;
	fid: string;
}
interface Response {
	status: boolean;
	message: string;
}
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
				message: `${user1.name} - ${user2.name}: Cha con`,
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
};
const checkRelationshipName: Function = (
	user1: Data,
	user2: Data
): string | void => {
	let res: Response;
	if ((res = checkRelationshipParentChildName(user1, user2)).status) {
		return res.message;
	}
};
export default {
	checkRelationshipName,
};
