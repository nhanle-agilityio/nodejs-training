import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const shared = {
  type: 'postgres' as const,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
};

const options: DataSourceOptions = process.env.DATABASE_URL
  ? { ...shared, url: process.env.DATABASE_URL }
  : {
      ...shared,
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: parseInt(process.env.DATABASE_PORT ?? '5433', 10),
      username: process.env.DATABASE_USERNAME ?? 'booking',
      password: process.env.DATABASE_PASSWORD ?? 'booking',
      database: process.env.DATABASE_NAME ?? 'booking',
    };

export default new DataSource(options);
