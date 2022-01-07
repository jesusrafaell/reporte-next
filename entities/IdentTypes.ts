import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import Users from './Users';

@Entity()
export default class Ident_types {
	/*
	constructor() {
		setTimeout(async () => {
			const data: Ident_types[] = [
				{
					name: 'V',
				},
				{
					name: 'E',
				},
				{
					name: 'J',
				},
				{
					name: 'R',
				},
				{
					name: 'P',
				},
			];
			//
			const valid = await getRepository(Ident_types).count({ where: data });
			if (!valid) await getRepository(Ident_types).save(data);
		}, 5000);
	}
	*/

	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => Users, (Users) => Users)
	@JoinColumn()
	Users?: Users[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
