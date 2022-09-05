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
	@PrimaryColumn()
	userId: string;

	@OneToOne(() => User, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	user: User;

	@Column({ nullable: false })
	role: string;
}
