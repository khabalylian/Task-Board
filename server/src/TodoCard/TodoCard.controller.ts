/* eslint-disable prettier/prettier */
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { TodoCard } from './TodoCard.entity';
import { CreateTodoCardDto } from './TodoCard.dto';
import { TodoCardService } from './TodoCard.service';

@Controller()
export class TodoCardController {
	TodoListService: any;
	constructor(
		private readonly todoCardService: TodoCardService,
	) {}

	@Post('card/:id')
	createCard(
		@Param('id') id: string,
		@Body() createCardDto: CreateTodoCardDto,
	) {
		return this.todoCardService.createCard(id, createCardDto);
	}

	@Patch('card/:id')
	editCard(@Param('id') id: number, @Body() createCardDto: CreateTodoCardDto) {
		return this.todoCardService.editCard(id, createCardDto);
	}

	@Get('card/:id')
	getAllCard(@Param('id') id: string) {
		return this.todoCardService.getCards(id);
	}

	@Delete('card/:id')
	deleteCard(@Param('id') id: number) {
		return this.todoCardService.deleteCard(id);
	}

	@Patch('moveTo')
	moveTo(@Body() createCardDto: { idListToMove: string; card: TodoCard }) {
		return this.todoCardService.moveTo(
			createCardDto.idListToMove,
			createCardDto.card,
		);
	}
}
