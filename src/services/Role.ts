import { RoleEntity, UserEntity } from "../entity";
import { AppDataSource } from "./../data-source";
const save = async ({ user, role }: { user: UserEntity; role: string }) => {
	const Role = AppDataSource.getRepository(RoleEntity);
	return await Role.save({
		user,
		role,
	});
};
const update = async ({ user, role }: { user: string; role: string }) => {
	const Role = AppDataSource.getRepository(RoleEntity);
	const _role = await Role.findOne({ where: { userId: user } });
	_role.role = role;
	return await Role.update(_role.userId, _role);
};

const getById = async ({ user }: { user: string }) => {
	const Role = AppDataSource.getRepository(RoleEntity);
	const res = await Role.findOne({ where: { userId: user } });
	if (res) {
		return {
			role: res.role,
		};
	} else {
		return {
			role: null,
		};
	}
};
export default {
	save,
	update,
	getById,
};
