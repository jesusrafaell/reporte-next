import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import Contact from './Contact';

@Entity()
export default class fm_ident_type {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => Contact, (Contact) => Contact.id_ident_type)
	@JoinColumn({ name: 'contacts' })
	contacts?: Contact[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
