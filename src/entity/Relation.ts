import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";

@Entity({ name: "relation" })
export default class Relation {
	@PrimaryColumn({ nullable: false })
	ancestorId: number;

	@PrimaryColumn({ nullable: false })
	descendantId: number;

	@Column({ nullable: false })
	depth: number;
}
