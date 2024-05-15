/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoCard} from './TodoCard/TodoCard.entity';
import { TodoList } from './TodoList/TodoList.entity';
import { TodoHistory } from './TodoHistory/TodoHistory.entity';
import { TodoListService } from './TodoList/TodoList.service';
import { TodoCardService } from './TodoCard/TodoCard.service';
import { TodoHistoryService } from './TodoHistory/TodoHistory.service';
import { TodoCardController } from './TodoCard/TodoCard.controller';
import { TodoHistoryController } from './TodoHistory/TodoHistory.controller';
import { TodoListController } from './TodoList/TodoList.controller';
import { AppDataSource } from 'typeorm.config';

@Module({
	imports: [
		TypeOrmModule.forFeature([TodoCard, TodoList, TodoHistory]),
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: () => (AppDataSource),
			inject: [ConfigService],
		}),
	],
	controllers: [TodoCardController, TodoHistoryController, TodoListController],
	providers: [TodoListService, TodoCardService, TodoHistoryService],
})
export class AppModule {}
