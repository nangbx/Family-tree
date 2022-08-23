import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { UserEntity } from "../entity";
import * as bcrypt from "bcrypt";

const getAll = async () => {
	const User = AppDataSource.getRepository(UserEntity);

	const users = await User.find();
	return users;
};

const getById = async (id: string) => {
	const User = AppDataSource.getRepository(UserEntity);

	const user = await User.findOne({ where: { id } });

	return user;
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
	const User = AppDataSource.getRepository(UserEntity);
	node1["pids"].push(node2);
	node2["pids"].push(node1);
	const res = {
		result1: {},
		result2: {},
	};
	res.result1 = await User.update(node1.id, node1);
	res.result2 = await User.update(node2.id, node2);
	return res;
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
	return await User.update(parent.id, parent);
};

export default {
	getById,
	getAll,
	save,
	update,
	createMidRelation,
	createPidsRelation,
	createFidRelation,
};
