/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoCard } from './TodoCard/TodoCard.entity';
import { TodoList } from './TodoList/TodoList.entity';
import { TodoHistory } from './TodoHistory/TodoHistory.entity';
import { TodoListService } from './TodoList/TodoList.service';
import { TodoCardService } from './TodoCard/TodoCard.service';
import { TodoHistoryService } from './TodoHistory/TodoHistory.service';
import { TodoCardController } from './TodoCard/TodoCard.controller';
import { TodoHistoryController } from './TodoHistory/TodoHistory.controller';
import { TodoListController } from './TodoList/TodoList.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([TodoCard, TodoList, TodoHistory]),
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: () => ({
				type: 'postgres',
				host: process.env.DB_HOST,
				port: +process.env.DB_PORT,
				username: process.env.DB_USERNAME,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				entities: [__dirname + '/**/*.entity{.js, .ts}'],
				synchronize: true,
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [TodoCardController, TodoHistoryController, TodoListController],
	providers: [TodoListService, TodoCardService, TodoHistoryService],
})
export class AppModule {}
