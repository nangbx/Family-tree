import { RelationEntity, UserEntity } from "../entity";
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

const getTree = async ({ id }: { id: string }) => {
	const Relation = AppDataSource.getRepository(RelationEntity);

	return await Relation.query(
		"SELECT * from relation as fr WHERE fr.ancestorId IN (SELECT fr.descendantId from relation as fr WHERE fr.ancestorId = :id) and fr.depth = 1",
		[id]
	);
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
		`Insert into relation (ancestorId, descendantId, depth) Select supertree.ancestorId, subtree.descendantId, supertree.depth + subtree.depth + 1 from relation as supertree join relation as subtree where subtree.ancestorId = :child and supertree.descendantId = :parent`,
		[child, parent]
	);
};

export default { getAll, save, getTree, createFidRelation };
