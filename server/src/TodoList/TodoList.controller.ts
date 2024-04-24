/* eslint-disable prettier/prettier */
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
} from '@nestjs/common';
import { CreateTodoListDto } from './TodoList.dto';
import { TodoListService } from './TodoList.service';

@Controller()
export class TodoListController {
	TodoListService: any;
	constructor(
		private readonly todoListService: TodoListService,
	) {}

	@Post('list')
	createList(@Body() createListDto: CreateTodoListDto) {
		return this.todoListService.createList(createListDto);
	}

	@Delete('list/:id')
	deleteList(@Param() id: string) {
		return this.todoListService.deleteList(id);
	}

	@Get('list')
	getAllList() {
		return this.todoListService.getAllList();
	}
}
