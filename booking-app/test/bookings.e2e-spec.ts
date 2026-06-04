import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { App } from 'supertest/types';
import { Booking, BookingStatus } from '../src/bookings/booking.entity';
import { Slot, SlotStatus } from '../src/slots/slot.entity';
import { User, UserRole } from '../src/users/user.entity';
import { cleanBookingE2eTables, saveOpenSlot } from './bookings-e2e-helpers';
import { createTestApp } from './create-test-app';

describe('Bookings (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeAll(async () => {
    ({ app } = await createTestApp());
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  beforeEach(async () => {
    await cleanBookingE2eTables(dataSource);
  });

  it('POST /api/bookings creates a booking and second request conflicts', async () => {
    const userRepo = dataSource.getRepository(User);
    const slotRepo = dataSource.getRepository(Slot);

    const user = await userRepo.save(
      userRepo.create({
        clerkId: `e2e_clerk_${Date.now()}`,
        email: `e2e-${Date.now()}@test.local`,
        name: 'E2E User',
        role: UserRole.User,
      }),
    );

    const slot = await saveOpenSlot(slotRepo);
    const server = app.getHttpServer();

    const first = await request(server)
      .post('/api/bookings')
      .set('x-test-user-id', user.id)
      .send({ slotId: slot.id })
      .expect(201);

    expect((first.body as { data: unknown }).data).toMatchObject({
      userId: user.id,
      slotId: slot.id,
    });

    await request(server)
      .post('/api/bookings')
      .set('x-test-user-id', user.id)
      .send({ slotId: slot.id })
      .expect(409);
  });

  it('POST /api/bookings rejects a slot that has already started', async () => {
    const userRepo = dataSource.getRepository(User);
    const slotRepo = dataSource.getRepository(Slot);

    const user = await userRepo.save(
      userRepo.create({
        clerkId: `e2e_past_${Date.now()}`,
        email: `e2e-past-${Date.now()}@test.local`,
        name: 'Past Slot User',
        role: UserRole.User,
      }),
    );

    const pastStart = new Date(Date.now() - 60 * 60 * 1000);
    const pastEnd = new Date(pastStart.getTime() + 60 * 60 * 1000);
    const slot = await slotRepo.save(
      slotRepo.create({
        title: 'Past slot',
        startTime: pastStart,
        endTime: pastEnd,
        price: 25,
        status: SlotStatus.Open,
      }),
    );

    await request(app.getHttpServer())
      .post('/api/bookings')
      .set('x-test-user-id', user.id)
      .send({ slotId: slot.id })
      .expect(400);
  });

  it('GET /api/bookings/me lists only current user bookings', async () => {
    const userRepo = dataSource.getRepository(User);
    const slotRepo = dataSource.getRepository(Slot);

    const user = await userRepo.save(
      userRepo.create({
        clerkId: `e2e_me_${Date.now()}`,
        email: `e2e-me-${Date.now()}@test.local`,
        name: 'Me',
        role: UserRole.User,
      }),
    );
    const slot = await saveOpenSlot(slotRepo);
    const server = app.getHttpServer();

    await request(server)
      .post('/api/bookings')
      .set('x-test-user-id', user.id)
      .send({ slotId: slot.id })
      .expect(201);

    const res = await request(server)
      .get('/api/bookings/me')
      .set('x-test-user-id', user.id)
      .expect(200);

    const body = res.body as {
      data: { items: { id: string }[]; total: number };
    };
    expect(body.data.items).toHaveLength(1);
    expect(body.data.total).toBe(1);
  });

  it('GET /api/bookings/:id returns 404 for another user', async () => {
    const userRepo = dataSource.getRepository(User);
    const slotRepo = dataSource.getRepository(Slot);
    const bookingRepo = dataSource.getRepository(Booking);

    const owner = await userRepo.save(
      userRepo.create({
        clerkId: `e2e_owner_${Date.now()}`,
        email: `e2e-owner-${Date.now()}@test.local`,
        name: 'Owner',
        role: UserRole.User,
      }),
    );
    const other = await userRepo.save(
      userRepo.create({
        clerkId: `e2e_other_${Date.now()}`,
        email: `e2e-other-${Date.now()}@test.local`,
        name: 'Other',
        role: UserRole.User,
      }),
    );
    const slot = await saveOpenSlot(slotRepo);
    const booking = await bookingRepo.save(
      bookingRepo.create({
        userId: owner.id,
        slotId: slot.id,
        status: BookingStatus.Pending,
      }),
    );

    const server = app.getHttpServer();
    await request(server)
      .get(`/api/bookings/${booking.id}`)
      .set('x-test-user-id', other.id)
      .expect(404);
  });

  it('GET /api/bookings is forbidden for regular user, allowed for admin', async () => {
    const userRepo = dataSource.getRepository(User);
    const user = await userRepo.save(
      userRepo.create({
        clerkId: `e2e_u_${Date.now()}`,
        email: `e2e-u-${Date.now()}@test.local`,
        name: 'U',
        role: UserRole.User,
      }),
    );
    const admin = await userRepo.save(
      userRepo.create({
        clerkId: `e2e_ad_${Date.now()}`,
        email: `e2e-ad-${Date.now()}@test.local`,
        name: 'Admin',
        role: UserRole.Admin,
      }),
    );
    const server = app.getHttpServer();

    await request(server)
      .get('/api/bookings')
      .set('x-test-user-id', user.id)
      .expect(403);

    const res = await request(server)
      .get('/api/bookings')
      .set('x-test-user-id', admin.id)
      .expect(200);

    const body = res.body as {
      data: { items: unknown[]; total: number; page: number; limit: number };
    };
    expect(body.data).toMatchObject({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
    });
  });

  it('PATCH /api/bookings/:id/cancel cancels PENDING booking for owner', async () => {
    const userRepo = dataSource.getRepository(User);
    const slotRepo = dataSource.getRepository(Slot);
    const bookingRepo = dataSource.getRepository(Booking);

    const user = await userRepo.save(
      userRepo.create({
        clerkId: `e2e_can_${Date.now()}`,
        email: `e2e-can-${Date.now()}@test.local`,
        name: 'Cancel',
        role: UserRole.User,
      }),
    );
    const slot = await saveOpenSlot(slotRepo);
    const booking = await bookingRepo.save(
      bookingRepo.create({
        userId: user.id,
        slotId: slot.id,
        status: BookingStatus.Pending,
      }),
    );
    const server = app.getHttpServer();

    const res = await request(server)
      .patch(`/api/bookings/${booking.id}/cancel`)
      .set('x-test-user-id', user.id)
      .expect(200);

    expect((res.body as { data: { status: string } }).data.status).toBe(
      BookingStatus.Cancelled,
    );
  });
});
