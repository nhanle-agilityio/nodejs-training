import 'reflect-metadata';
import { Event } from '../entities/Event.js';

import { DataSource } from 'typeorm';
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  logging: false,
  entities: [Event],
  migrations: ['src/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  subscribers: [],
});
