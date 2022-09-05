import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity, RelationEntity, PidEntity, RoleEntity } from "./entity";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DATABASE_HOST,
	port: Number.parseInt(process.env.DATABASE_PORT || "3306"),
	username: "root",
	password: "",
	database: "tree",
	synchronize: true,
	logging: false,
	entities: [UserEntity, RelationEntity, PidEntity, RoleEntity],
	migrations: [],
	subscribers: [],
});
