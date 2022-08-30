import { string } from "yup";
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
				id: _pidUser.id,
				name: _pidUser.name,
				gender: _pidUser.gender,
				mid: _pidUser.mid,
				fid: _pidUser.fid,
				status: _pidUser.status,
				pids: [id],
			});
			_userPids.push(pid.pid);
		}
		relation.push({
			id: _user.id,
			name: _user.name,
			gender: _user.gender,
			mid: _user.mid,
			fid: _user.fid,
			status: _user.status,
			pids: [..._userPids],
		});
	}
	if (relation.length === 0) {
		const _user = await UserService.getById(id);
		const pids = await Pid.query(`Select pid from pids where userId = ?`, [
			_user.id,
		]);
		const _userPids = [];
		for (const pid of pids) {
			const _pidUser = await UserService.getById(pid.pid);
			relation.push({
				id: _pidUser.id,
				name: _pidUser.name,
				gender: _pidUser.gender,
				mid: _pidUser.mid,
				fid: _pidUser.fid,
				status: _pidUser.status,
				pids: [id],
			});
			_userPids.push(pid.pid);
		}
		relation.push({
			id: _user.id,
			name: _user.name,
			gender: _user.gender,
			mid: _user.mid,
			fid: _user.fid,
			status: _user.status,
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

const deleteFidRelation = async ({
	parent,
	child,
}: {
	parent: string;
	child: string;
}) => {
	const Relation = AppDataSource.getRepository(RelationEntity);

	return await Relation.query(
		`DELETE FROM relation WHERE descendantId IN (SELECT descendantId FROM relation WHERE ancestorId = ?) AND ancestorId NOT IN (SELECT descendantId FROM relation WHERE ancestorId = ?) AND ancestorId IN (SELECT descendantId FROM relation AS f1 INNER JOIN (Select ancestorId from relation as fr WHERE fr.descendantId = ? ORDER By depth DESC LIMIT 1) AS f2  ON f1.ancestorId = f2.ancestorId)`,
		[child, child, child]
	);
};

export default { getAll, save, getTree, createFidRelation, deleteFidRelation };
