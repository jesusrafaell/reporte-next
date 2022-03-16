import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, Index, ManyToOne, OneToOne } from 'typeorm';
import Ident_Type from './Ident_Type';
import User from './User';

@Entity()
@Index(['id_ident_type', 'ident_num'], { unique: true })
export default class fm_worker {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => Ident_Type, (Ident_Type) => Ident_Type.Contact)
	@JoinColumn({ name: 'id_ident_type' })
	id_ident_type!: number;

	@Column({ nullable: true })
	ident_num!: string;

	@Column({ nullable: true, default: null })
	@OneToOne(() => User, (User) => User.id_contact)
	@JoinColumn({ name: 'id_user' })
	id_user!: number | User;
}
