import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Contact from './Contact';

@Entity()
export default class User {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ unique: true })
	email!: string;

	@Column({ nullable: true })
	password!: string;

	@Column({ nullable: false })
	@OneToOne(() => Contact)
	@JoinColumn({ name: 'id_contact' })
	id_contact!: number | Contact;

	@CreateDateColumn({ select: false })
	createdAt?: Date;
}
