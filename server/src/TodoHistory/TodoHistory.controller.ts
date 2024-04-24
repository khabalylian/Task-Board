/* eslint-disable prettier/prettier */
import {
	Body,
	Controller,
	Get,
	Param,
	Post,
} from '@nestjs/common';
import { TodoHistoryService } from './TodoHistory.service';
import { CreateHistoryDto } from './TodoHistory.dto';
@Controller()
export class TodoHistoryController {
	TodoListService: any;
	constructor(
		private readonly todoHistoryService: TodoHistoryService,
	) {}

	@Post('history/:id?')
	addHistoryCard(
		@Body() createCardDto: CreateHistoryDto,
		@Param('id') id?: number,
	) {
		return this.todoHistoryService.addHistoryCard(createCardDto, id);
	}

	@Get('history')
	getAllHistoryCard() {
		return this.todoHistoryService.getAllHistoryCard();
	}

	@Get('historyCard/:id')
	getHistoryCard(@Param('id') id: number) {
		return this.todoHistoryService.getHistoryCard(id);
	}
}
