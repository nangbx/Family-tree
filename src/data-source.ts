import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity, RelationEntity, PidEntity } from "./entity";

export const AppDataSource = new DataSource({
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: "root",
	password: "",
	database: "ceta",
	synchronize: true,
	logging: false,
	entities: [UserEntity, RelationEntity, PidEntity],
	migrations: [],
	subscribers: [],
});
