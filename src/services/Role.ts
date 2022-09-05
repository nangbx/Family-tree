import { RoleEntity } from "../entity";
import { AppDataSource } from "./../data-source";
const save = async ({ user, role }: { user: string; role: string }) => {
	const Role = AppDataSource.getRepository(RoleEntity);
	return await Role.save({
		user,
		role,
	});
};
const update = async ({ user, role }: { user: string; role: string }) => {
	const Role = AppDataSource.getRepository(RoleEntity);
	const _role = await Role.findOne({ where: { user } });
	_role.role = role;
	return await Role.update(_role.id, _role);
};
export default {
	save,
	update,
};
