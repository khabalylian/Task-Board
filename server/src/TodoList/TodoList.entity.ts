/* eslint-disable prettier/prettier */
import { TodoCard } from 'src/TodoCard/TodoCard.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn,
	DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'todo_list' })
export class TodoList {
	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@OneToMany(() => TodoCard, (todo) => todo.listCard)
	card: TodoCard[];

	@CreateDateColumn()
	createAt: Date;

	@UpdateDateColumn()
	updateAt: Date;

	@DeleteDateColumn()
	deletedAt: Date;
}
