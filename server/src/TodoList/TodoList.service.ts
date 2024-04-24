/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './TodoList.dto';
import { v4 } from 'uuid';
import { TodoList } from './TodoList.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoListService {
	constructor(
		@InjectRepository(TodoList) private readonly TodoList: Repository<TodoList>,
	) {}

	async createList(createTodoList: CreateTodoListDto) {
		const id: string = v4();

		const todoList = new TodoList();
		(todoList.name = createTodoList.name),
			(todoList.id = id),
			(todoList.card = []);

		return await this.TodoList.save(todoList);
	}

	async deleteList(idList: string) {
		return await this.TodoList.delete(idList);
	}

	async getAllList() {
		const todoList = await this.TodoList.find({
			relations: ['card'],
			order: {
				createAt: 'asc'
			}
		});

		// Сортуємо кожний список за полем createAt у порядку зростання
		todoList.forEach((list) => {
			list.card.sort((a, b) => b.uniqId - a.uniqId);
		});

		return todoList;
	}
}
