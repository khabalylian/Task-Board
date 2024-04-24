/* eslint-disable prettier/prettier */
import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	DeleteDateColumn,
} from 'typeorm';
import { TodoCard } from 'src/TodoCard/TodoCard.entity';

@Entity({ name: 'history' })
export class TodoHistory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	text: string;

	@Column()
	time: string;

	@ManyToOne(() => TodoCard, (todo) => todo.history, { onDelete: 'CASCADE' })
	card: TodoCard;

	@Column({ nullable: true })
	cardId: number;

	@DeleteDateColumn()
	deletedAt?: Date;
}
