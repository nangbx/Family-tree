import {
	Entity,
	PrimaryColumn,
	Column,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	OneToOne,
} from "typeorm";
import User from "./User";

@Entity({ name: "role" })
export default class Role {
	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@OneToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
	user: User;

	@Column({ nullable: false })
	role: string;
}