import { RelationEntity } from "../entity";
import { AppDataSource } from "./../data-source";

const getAll = async () => {
	const Relation = AppDataSource.getRepository(RelationEntity);
};

export default { getAll };
