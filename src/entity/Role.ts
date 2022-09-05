import {
	Entity,
	PrimaryColumn,
	Column,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
} from "typeorm";
import User from "./User";

@Entity({ name: "role" })
export default class Role {
	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@OneToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
	@JoinColumn()
	user: string;

	@Column({ nullable: false })
	role: string;
}
