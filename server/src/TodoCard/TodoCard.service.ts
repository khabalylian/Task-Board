/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoCard } from './TodoCard.entity';
import { CreateTodoCardDto } from './TodoCard.dto';
import { TodoList } from 'src/TodoList/TodoList.entity';

@Injectable()
export class TodoCardService {
	constructor(
		@InjectRepository(TodoList) private readonly TodoList: Repository<TodoList>,
		@InjectRepository(TodoCard) private readonly TodoCard: Repository<TodoCard>,
	) {}

	async createCard(id: string, createTodoCard: CreateTodoCardDto) {
		const list = await this.TodoList.findOne({
			where: {
				id: id,
			},
			relations: ['card'],
		});

		const card = await this.TodoCard.findOne({
			where: {
				listCardId: id
			},
			order: {
				uniqId: 'DESC',
			},
		});

		const maxPosition = card ? card.uniqId + 1 : 1;

		const newCard = this.TodoCard.create({
			uniqId: maxPosition,
			...createTodoCard,
		});

		const savedCard = await this.TodoCard.save(newCard);

		list.card.push(savedCard);

		await this.TodoList.save(list);
		return savedCard;
	}

	async editCard(idCard: number, editTodoCard: CreateTodoCardDto) {
		const card = await this.TodoCard.findOne({
			where: {
				id: idCard,
			},
		});

		const updatedCard = Object.assign({}, card);

		const oldValue = {
			title: card.title !== editTodoCard.title ? card.title : null,
			description:
				card.description !== editTodoCard.description ? card.description : null,
			priority: card.priority !== editTodoCard.priority ? card.priority : null,
			time: card.time !== editTodoCard.time ? card.time : null,
		};

		updatedCard.oldValue = JSON.stringify(oldValue);
		Object.assign(updatedCard, editTodoCard);

		await this.TodoCard.save(updatedCard);

		return updatedCard;
	}

	async deleteCard(idCard: number) {
		return await this.TodoCard.delete(idCard);
	}

	async getCards(id: string) {
		const todoList = await this.TodoCard.find({
			where: {
				listCardId: id,
			},
		});

		return { todoList };
	}

	async moveTo(idListToMove: string, card: TodoCard) {
		const idCard = card.id;

		const cardToMove = await this.TodoCard.findOne({
			where: {
				id: idCard,
			},
		});

		const cards = await this.TodoCard.findOne({
			where: {
				listCardId: idListToMove,
			},
			order: {
				uniqId: 'DESC',
			},
		});

		const listMove = await this.TodoList.findOne({
			where: {
				id: idListToMove,
			},
			relations: ['card'],
		});

		cardToMove.uniqId = cards ? cards.uniqId + 1 : 1;

		await this.TodoCard.save(cardToMove);

		listMove.card.push(cardToMove);

		await this.TodoList.save(listMove);
	}
}
