import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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

	@OneToMany(() => User, (user) => user.id, { onDelete: "CASCADE" })
	wife?: User[];
}
