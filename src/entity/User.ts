import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	OneToOne,
	JoinColumn,
	ManyToOne,
	ManyToMany,
} from "typeorm";
import Pid from "./Pid";

export enum UserGender {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}
@Entity({ name: "user" })
export default class User {
	@PrimaryGeneratedColumn("uuid")
	id?: string;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false, type: "enum", enum: UserGender })
	gender: UserGender;

	@Column()
	image: string;

	@Column({ nullable: false, unique: true })
	phone: string;

	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: false })
	password: string;

	@OneToMany(() => Pid, (pids) => pids.pid)
	pids?: Pid[];

	@OneToOne(() => User, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "mid" })
	mid?: User;

	@OneToOne(() => User, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "fid" })
	fid?: User;
}
