import 'reflect-metadata';
import { Event } from '../entities/Event.js';
import { User } from '../entities/User.js';
import { RefreshToken } from '../entities/RefreshToken.js';
import { UserSubscriber } from '../subscribers/userSubscriber.js';

import { DataSource } from 'typeorm';
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  logging: false,
  entities: [Event, User, RefreshToken],
  migrations: ['src/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  subscribers: [new UserSubscriber()],
});
