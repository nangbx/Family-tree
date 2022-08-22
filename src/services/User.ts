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

export default { getById, getAll, save, update };
