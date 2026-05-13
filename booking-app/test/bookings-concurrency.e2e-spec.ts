import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { App } from 'supertest/types';
import { Slot } from '../src/slots/slot.entity';
import { User, UserRole } from '../src/users/user.entity';
import { cleanBookingE2eTables, saveOpenSlot } from './bookings-e2e-helpers';
import { createTestApp } from './create-test-app';

describe('Bookings concurrency (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    app = (await createTestApp()) as INestApplication<App>;
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  beforeEach(async () => {
    await cleanBookingE2eTables(dataSource);
  });

  it('50 concurrent POST /api/bookings: exactly one succeeds for the same slot', async () => {
    const userRepo = dataSource.getRepository(User);
    const slotRepo = dataSource.getRepository(Slot);

    const user = await userRepo.save(
      userRepo.create({
        clerkId: `e2e_race_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        email: `e2e-race-${Date.now()}@test.local`,
        name: 'Race',
        role: UserRole.User,
      }),
    );
    const slot = await saveOpenSlot(slotRepo);
    const server = app.getHttpServer();

    const n = 50;
    const results = await Promise.all(
      Array.from({ length: n }, () =>
        request(server)
          .post('/api/bookings')
          .set('x-test-user-id', user.id)
          .send({ slotId: slot.id }),
      ),
    );

    const created = results.filter((r) => r.status === 201);
    const conflict = results.filter((r) => r.status === 409);

    expect(created).toHaveLength(1);
    expect(conflict.length + created.length).toBe(n);
  });
});
