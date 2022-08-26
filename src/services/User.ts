import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { PidEntity, UserEntity } from "../entity";
import * as bcrypt from "bcrypt";
import { string } from "yup";

const getAll = async () => {
	const User = AppDataSource.getRepository(UserEntity);

	const users = await User.find();
	return users;
};

const getById = async (id: string) => {
	const User = AppDataSource.getRepository(UserEntity);
	try {
		const [user] = await User.query(`Select * from user where user.id = ?`, [
			id,
		]);
		return user;
	} catch (e) {
		console.log(e);
	}
};

const save = async (user: UserEntity) => {
	const User = AppDataSource.getRepository(UserEntity);
	const salt = bcrypt.genSaltSync(Number.parseInt(process.env.SALT || "10"));
	const hash = bcrypt.hashSync(user.password, salt);
	return await User.save({ ...user, password: hash });
};

const update = async (id: string, user: UserEntity) => {
	const User = AppDataSource.getRepository(UserEntity);
	return await User.update(id, user);
};

const createPidsRelation = async ({
	node1,
	node2,
}: {
	node1: UserEntity;
	node2: UserEntity;
}) => {
	const Pid = AppDataSource.getRepository(PidEntity);
	const result = [];
	const _pid1 = new PidEntity();
	_pid1["pid"] = node2.id;
	_pid1["user"] = node1;
	result.push(await Pid.save(_pid1));
	const _pid2 = new PidEntity();
	_pid2["pid"] = node1.id;
	_pid2["user"] = node2;
	result.push(await Pid.save(_pid2));
	return result;
};
const createMidRelation = async ({
	mother,
	child,
}: {
	mother: UserEntity;
	child: UserEntity;
}) => {
	const User = AppDataSource.getRepository(UserEntity);
	child["mid"] = mother;
	return await User.update(child.id, child);
};
const createFidRelation = async ({
	parent,
	child,
}: {
	parent: UserEntity;
	child: UserEntity;
}) => {
	const User = AppDataSource.getRepository(UserEntity);
	child["fid"] = parent;
	return await User.update(child.id, child);
};

const deleteMidRelation = async ({ child }: { child: UserEntity }) => {
	const User = AppDataSource.getRepository(UserEntity);
	child["mid"] = null;
	return await User.update(child.id, child);
};
const deletePidRelation = async ({
	node1,
	node2,
}: {
	node1: string;
	node2: string;
}) => {
	const Pid = AppDataSource.getRepository(PidEntity);
	return await Pid.query(
		`Delete from pids where (userId = ? and pid = ?) or (userId = ? and pid = ?)`,
		[node1, node2, node2, node1]
	);
};

export default {
	getById,
	getAll,
	save,
	update,
	createMidRelation,
	createPidsRelation,
	createFidRelation,
	deleteMidRelation,
	deletePidRelation,
};
