import 'reflect-metadata';
import { Event } from '../entities/Event.js';
import { User } from '../entities/User.js';
import { RefreshToken } from '../entities/RefreshToken.js';
import { UserSubscriber } from '../subscribers/userSubscriber.js';
import { DataSource } from 'typeorm';

/**
 * Test database configuration
 */
export const TestDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:', // Use in-memory database
  synchronize: true, // only for testing
  logging: false,
  entities: [Event, User, RefreshToken],
  migrations: [],
  subscribers: [new UserSubscriber()],
  dropSchema: true,
});
