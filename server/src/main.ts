/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: [
			'http://localhost:5173',
			'https://react-app-psi-swart.vercel.app',
			'https://task-board-zeta-seven.vercel.app',
			'https://task-board-khabalylians-projects.vercel.app',
		],
	});

	await app.listen(3001);
}
bootstrap();
