import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { createE2eApp } from './utils/create-app';
import { resetSchema } from './utils/db';

describe('Products (e2e) — smoke', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const ctx = await createE2eApp();
    app = ctx.app;
    dataSource = ctx.dataSource;
    await resetSchema(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/products returns empty array wrapped in { data }', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);

    expect(res.body).toEqual({ data: [] });
  });
});
