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
export enum UserStatus {
	LIVING = "living",
	DECEASED = "deceased",
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

	@Column({ type: "enum", enum: UserStatus, default: UserStatus.LIVING })
	status?: UserStatus;

	@Column({ type: "date", default: () => "NOW()" })
	dob: string;

	@OneToMany(() => Pid, (pids) => pids.pid)
	pids?: Pid[];

	@OneToOne(() => User, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "mid" })
	mid?: User;

	@ManyToOne(() => User, (user) => user.id, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	@JoinColumn({ name: "fid" })
	fid?: User;
}
