import { DataSource } from 'typeorm';
import 'dotenv/config';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5433', 10),
  username: process.env.DATABASE_USERNAME ?? 'booking',
  password: process.env.DATABASE_PASSWORD ?? 'booking',
  database: process.env.DATABASE_NAME ?? 'booking',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
