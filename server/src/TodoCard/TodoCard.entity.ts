/* eslint-disable prettier/prettier */
import {
	Column,
	CreateDateColumn,
	Entity,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { TodoList } from 'src/TodoList/TodoList.entity';
import { TodoHistory } from 'src/TodoHistory/TodoHistory.entity';

@Entity({ name: 'todo_card' })
export class TodoCard {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	uniqId: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	time: string;

	@Column()
	priority: string;

	@ManyToOne(() => TodoList, (todo) => todo.card, { onDelete: 'CASCADE' })
	listCard: TodoList;

	@Column({ nullable: true })
	listCardId: string;

	@OneToMany(() => TodoHistory, (todos) => todos.card)
	history: TodoHistory[];

	@Column({ type: 'text', nullable: true })
	oldValue: string;

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
