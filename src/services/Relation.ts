import { RelationEntity } from "../entity";
import { AppDataSource } from "./../data-source";

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

export default { getAll, save };
