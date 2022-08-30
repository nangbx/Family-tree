import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { PidEntity, UserEntity } from "../entity";
import * as bcrypt from "bcrypt";
import { string } from "yup";
import { UserStatus } from "../entity/User";

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
	const salt = bcrypt.hashSync(
		user.password,
		"$2a$10$7h/0SQ4FXRG5eX3602o3/.aO.RYkxKuhGkzvIXHLUiMJlFt1P.6Pe"
	);
	return await User.save({ ...user, password: salt });
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
const deleteFidRelation = async ({ child }: { child: UserEntity }) => {
	const User = AppDataSource.getRepository(UserEntity);
	child["fid"] = null;
	return await User.update(child.id, child);
};
const updateStatus = async (_user, status: UserStatus) => {
	const User = AppDataSource.getRepository(UserEntity);
	_user.status = status;
	return await User.update(_user.id, _user);
};

export default {
	getById,
	getAll,
	save,
	update,
	updateStatus,
	createMidRelation,
	createPidsRelation,
	createFidRelation,
	deleteMidRelation,
	deletePidRelation,
	deleteFidRelation,
};
