import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, Index, ManyToOne } from 'typeorm';
import Ident_types from './IdentTypes';

@Entity()
@Index(['id_ident_type', 'ident_num'], { unique: true })
export default class Users {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Column()
	ident_num!: string;

	@ManyToOne(() => Ident_types, (Ident_types) => Ident_types.Users)
	@JoinColumn({ name: 'id_ident_type' })
	id_ident_type!: number | Ident_types;

	@Column({ default: 0 })
	block?: number;
}
