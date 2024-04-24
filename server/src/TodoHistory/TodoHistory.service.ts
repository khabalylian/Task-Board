/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoHistory } from './TodoHistory.entity';
import { CreateHistoryDto } from './TodoHistory.dto';
import { TodoCard } from 'src/TodoCard/TodoCard.entity';

@Injectable()
export class TodoHistoryService {
	constructor(
		@InjectRepository(TodoHistory)
		private readonly TodoHistory: Repository<TodoHistory>,
		@InjectRepository(TodoCard) private readonly TodoCard: Repository<TodoCard>,
	) {}

	async addHistoryCard(history: CreateHistoryDto, idCard?: number) {
		const card = await this.TodoCard.findOne({
			where: {
				id: idCard,
			},
			relations: ['history'],
		});
		if (!idCard) return await this.TodoHistory.save(history);

		const date = await this.TodoHistory.save(history);

		card.history.push(date);

		return await this.TodoCard.save(card);
	}

	async getHistoryCard(id: number) {
		const card = await this.TodoHistory.find({
			where: {
				cardId: id,
			},
			order: {
				id: 'ASC',
			},
		});

		return card;
	}

	async getAllHistoryCard() {
		const card = await this.TodoHistory.find({
			order: {
				id: 'ASC',
			},
		});
		return card;
	}
}
