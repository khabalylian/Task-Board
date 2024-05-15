/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource: DataSourceOptions = {
	type: 'postgres',
	port: 5344,
	host: 'localhost',
	username: 'postgres',
	password: 'ulian4685',
	database: 'react-app',
	synchronize: true,
	entities: [
		'dist/**/*.entity.js'
	],
	migrations: ['dist/src/migrations/*.js'],
	migrationsTableName: 'migrations',
};

const dataSource = new DataSource(AppDataSource);

export default dataSource;