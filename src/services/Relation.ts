import { UserService } from ".";
import { PidEntity, RelationEntity, UserEntity } from "../entity";
import { AppDataSource } from "./../data-source";
import User from "./User";

const getAll = async () => {
	const Relation = AppDataSource.getRepository(RelationEntity);
};

const save = async ({ id }: { id: string }) => {
	const Relation = AppDataSource.getRepository(RelationEntity);
	const node = new RelationEntity();
	node["ancestorId"] = id;
	node["descendantId"] = id;
	node["depth"] = 0;
	return await Relation.save(node);
};

const getTree = async ({ id }: { id: string }) => {
	const Relation = AppDataSource.getRepository(RelationEntity);
	const Pid = AppDataSource.getRepository(PidEntity);
	const res = await Relation.query(
		`SELECT * FROM user where user.id IN ((SELECT f.ancestorId as id from relation as f WHERE f.ancestorId IN (SELECT fr.descendantId from relation as fr WHERE fr.ancestorId = ?) and f.depth = 1) UNION (SELECT f.descendantId as id from relation as f WHERE f.ancestorId IN (SELECT fr.descendantId from relation as fr WHERE fr.ancestorId = ?) and f.depth = 1))`,
		[id, id]
	);
	const relation = [];
	for (const item of res) {
		const id = item.id;
		const _user = await UserService.getById(id);

		const pids = await Pid.query(`Select pid from pids where userId = ?`, [
			_user.id,
		]);

		const _userPids = [];
		for (const pid of pids) {
			const _pidUser = await UserService.getById(pid.pid);
			relation.push({
				..._pidUser,
				pids: [id],
			});
			_userPids.push(pid.pid);
		}
		relation.push({
			..._user,
			pids: [..._userPids],
		});
	}

	return relation;
};

const createFidRelation = async ({
	parent,
	child,
}: {
	parent: string;
	child: string;
}) => {
	const Relation = AppDataSource.getRepository(RelationEntity);
	return await Relation.query(
		`Insert into relation (ancestorId, descendantId, depth) Select supertree.ancestorId, subtree.descendantId, supertree.depth + subtree.depth + 1 from relation as supertree join relation as subtree where subtree.ancestorId = ? and supertree.descendantId = ?`,
		[child, parent]
	);
};

export default { getAll, save, getTree, createFidRelation };
