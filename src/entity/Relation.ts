import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

@Entity({ name: "relation" })
export default class Relation {
	@PrimaryColumn({ nullable: false })
	ancestorId: string;

	@PrimaryColumn({ nullable: false })
	descendantId: string;

	@Column({ nullable: false })
	depth: number;
}
