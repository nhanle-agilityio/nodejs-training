import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { Product } from '../src/products/product.entity';
import { createE2eApp } from './utils/create-app';
import { clearTables, resetSchema } from './utils/db';
import {
  asAdmin,
  asUser,
  setupClerkMock,
  withInvalidToken,
} from './utils/clerk-mock';

describe('Products (E2E)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  const baseUrl = '/api/v1/products';
  const mockUUID = '6a425c1f-954b-4c1d-b5bc-a6ba9205bd66';
  const http = () =>
    request(app.getHttpServer() as Parameters<typeof request>[0]);

  beforeAll(async () => {
    const ctx = await createE2eApp();
    app = ctx.app;
    dataSource = ctx.dataSource;
    await resetSchema(dataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await clearTables(dataSource, [Product]);
    setupClerkMock();
  });

  const seedProduct = async (overrides: Partial<Product> = {}) => {
    const repo = dataSource.getRepository(Product);
    return repo.save(
      repo.create({
        name: 'Seed',
        price: 10,
        description: 'seeded',
        ...overrides,
      }),
    );
  };

  describe('GET /api/v1/products (Public API - No Auth)', () => {
    it('Return empty array when no data, without token', async () => {
      const res = await http().get(baseUrl);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ data: [] });
    });

    it('Return seeded products', async () => {
      await seedProduct({ name: 'Apple', price: 1.5 });
      await seedProduct({ name: 'Banana', price: 2 });

      const res = await http().get(baseUrl);
      const body = res.body as { data?: Product[] };
      expect(res.status).toBe(200);
      expect(body.data).toHaveLength(2);
      expect(body.data).toEqual([
        expect.objectContaining({ name: 'Apple', price: '1.50' }), // TypeORM often maps decimal to string;
        expect.objectContaining({ name: 'Banana', price: '2.00' }),
      ]);
    });

    it('Filter by searchTerm', async () => {
      await seedProduct({ name: 'Apple' });
      await seedProduct({ name: 'Banana' });
      await seedProduct({ name: 'Pineapple' });

      const res = await http().get(baseUrl).query({ searchTerm: 'APP' });

      const body = res.body as { data?: Product[] };
      expect(res.status).toBe(200);
      expect(body.data).toHaveLength(2);
      const names = body.data?.map((p) => p.name).sort();
      expect(names).toEqual(['Apple', 'Pineapple']);
    });
  });

  describe('GET /api/v1/products/:id (Authenticated)', () => {
    it('200 — return product when user has a valid token', async () => {
      const saved = await seedProduct({ name: 'Target' });

      const res = await http().get(`${baseUrl}/${saved.id}`).set(asUser());

      expect(res.status).toBe(200);
      expect((res.body as { data?: Product }).data).toEqual(
        expect.objectContaining({ id: saved.id, name: 'Target' }),
      );
    });

    it('200 — admin can access as well', async () => {
      const saved = await seedProduct({ name: 'Target' });

      const res = await http().get(`${baseUrl}/${saved.id}`).set(asAdmin());

      expect(res.status).toBe(200);
    });

    it('401 — when no Authorization header is provided', async () => {
      const saved = await seedProduct();

      const res = await http().get(`${baseUrl}/${saved.id}`);

      expect(res.status).toBe(401);
    });

    it('401 — when token is invalid', async () => {
      const saved = await seedProduct();

      const res = await http()
        .get(`${baseUrl}/${saved.id}`)
        .set(withInvalidToken());

      expect(res.status).toBe(401);
    });

    it('404 — when id does not exist', async () => {
      const res = await http().get(`${baseUrl}/${mockUUID}`).set(asUser());

      expect(res.status).toBe(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          statusCode: 404,
          path: `${baseUrl}/${mockUUID}`,
        }),
      );
    });

    it('400 — when id is not a UUID', async () => {
      const res = await http().get(`${baseUrl}/not-a-uuid`).set(asUser());

      expect(res.status).toBe(400);
      expect(res.body).toEqual(
        expect.objectContaining({
          statusCode: 400,
          path: `${baseUrl}/not-a-uuid`,
        }),
      );
    });
  });

  describe('POST /api/v1/products (Admin only)', () => {
    it('201 — admin can create', async () => {
      const res = await http().post(baseUrl).set(asAdmin()).send({
        name: 'New Product',
        price: 10,
      });

      expect(res.status).toBe(201);
      expect((res.body as { data?: Product }).data).toEqual(
        expect.objectContaining({
          name: 'New Product',
          price: 10,
        }),
      );
    });

    it('403 — normal user cannot create', async () => {
      const res = await http().post(baseUrl).set(asUser()).send({
        name: 'New Product',
        price: 10,
      });
      expect(res.status).toBe(403);
    });

    it('401 — without token', async () => {
      const res = await http().post(baseUrl).send({
        name: 'New Product',
        price: 10,
      });
      expect(res.status).toBe(401);
    });

    it('400 — invalid body', async () => {
      const res = await http().post(baseUrl).set(asAdmin()).send({
        name: 'New Product',
        price: 'invalid',
      });
      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /api/v1/products/:id (Admin only)', () => {
    it('200 — admin can update', async () => {
      const saved = await seedProduct({ name: 'Target' });

      const res = await http()
        .patch(`${baseUrl}/${saved.id}`)
        .set(asAdmin())
        .send({
          name: 'Updated Product',
          price: 15,
        });

      expect(res.status).toBe(200);
      expect((res.body as { data?: Product }).data).toEqual(
        expect.objectContaining({
          name: 'Updated Product',
          price: 15,
        }),
      );
    });

    it('403 — normal user cannot update', async () => {
      const saved = await seedProduct();

      const res = await http()
        .patch(`${baseUrl}/${saved.id}`)
        .set(asUser())
        .send({
          name: 'Updated Product',
          price: 15,
        });

      expect(res.status).toBe(403);
    });

    it('401 — without token', async () => {
      const saved = await seedProduct();

      const res = await http().patch(`${baseUrl}/${saved.id}`).send({
        name: 'Updated Product',
        price: 15,
      });

      expect(res.status).toBe(401);
    });

    it('400 — invalid body', async () => {
      const saved = await seedProduct();

      const res = await http()
        .patch(`${baseUrl}/${saved.id}`)
        .set(asAdmin())
        .send({
          name: 'Updated Product',
          price: 'invalid',
        });

      expect(res.status).toBe(400);
    });

    it('404 — when id does not exist', async () => {
      const res = await http()
        .patch(`${baseUrl}/${mockUUID}`)
        .set(asAdmin())
        .send({
          name: 'Updated Product',
          price: 15,
        });

      expect(res.status).toBe(404);
      expect(res.body).toEqual(
        expect.objectContaining({
          statusCode: 404,
          path: `${baseUrl}/${mockUUID}`,
        }),
      );
    });
  });

  describe('DELETE /api/v1/products/:id (Admin only)', () => {
    it('200 — admin can delete', async () => {
      const saved = await seedProduct({ name: 'Target' });

      const res = await http().delete(`${baseUrl}/${saved.id}`).set(asAdmin());

      expect(res.status).toBe(200);

      const stillThere = await dataSource
        .getRepository(Product)
        .findOne({ where: { id: saved.id } });
      expect(stillThere).toBeNull();
    });

    it('403 — normal user cannot delete', async () => {
      const saved = await seedProduct();

      const res = await http().delete(`${baseUrl}/${saved.id}`).set(asUser());

      expect(res.status).toBe(403);
    });

    it('401 — without token', async () => {
      const saved = await seedProduct();

      const res = await http().delete(`${baseUrl}/${saved.id}`);

      expect(res.status).toBe(401);
    });

    it('404 — admin deleting non-existent id', async () => {
      const res = await http().delete(`${baseUrl}/${mockUUID}`).set(asAdmin());

      expect(res.status).toBe(404);
    });
  });
});
