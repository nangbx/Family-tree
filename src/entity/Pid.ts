import {
	Entity,
	PrimaryColumn,
	Column,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";

@Entity({ name: "pids" })
export default class Pid {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	pid: string;

	@ManyToOne(() => User, (user) => user.pids)
	user: User;
}
