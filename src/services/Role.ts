import { RoleEntity } from "../entity";
import { AppDataSource } from "./../data-source";
const save = async ({ user, role }: { user: string; role: string }) => {
	const Role = AppDataSource.getRepository(RoleEntity);
	return await Role.save({
		user,
		role,
	});
};
export default {
	save,
};
