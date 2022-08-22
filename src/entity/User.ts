import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

export enum UserGender {
	MALE = "male",
	FEMALE = "female",
	OTHER = "other",
}
@Entity({ name: "user" })
export default class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false, type: "enum", enum: UserGender })
	gender: UserGender;

	@Column()
	image: string;

	@Column({ nullable: false })
	phone: string;

	@Column({ nullable: false })
	email: string;

	@Column({ nullable: false })
	password: string;

	@OneToMany(() => User, (user) => user.id, { onDelete: "CASCADE" })
	wife: User[];
}
