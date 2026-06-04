import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { App } from 'supertest/types';
import { BookingStatus } from '../src/bookings/booking.entity';
import { Payment, PaymentStatus } from '../src/payments/payment.entity';
import { Slot } from '../src/slots/slot.entity';
import { User, UserRole } from '../src/users/user.entity';
import {
  cleanBookingE2eTables,
  flushRedisTestKeys,
  getTestRedis,
  saveOpenSlot,
  SLOTS_LIST_CACHE_KEY,
} from './bookings-e2e-helpers';
import { createTestApp } from './create-test-app';
import { buildPaymentIntentSucceededEvent } from './stripe-mock';
import type { StripeMock } from './stripe-mock';

describe('Booking flow (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;
  let stripeMock: StripeMock;

  beforeAll(async () => {
    ({ app, stripeMock } = await createTestApp());
    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  beforeEach(async () => {
    await cleanBookingE2eTables(dataSource);
    await flushRedisTestKeys(getTestRedis(app));
  });

  it('GET /health reports database and redis as up', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);

    const body = res.body as {
      data: {
        status: string;
        info: Record<string, { status: string }>;
      };
    };

    expect(body.data.status).toBe('ok');
    expect(body.data.info.database.status).toBe('up');
    expect(body.data.info.redis.status).toBe('up');
  });

  it('runs full booking flow: list slots → book → checkout → webhook → confirmed', async () => {
    const userRepo = dataSource.getRepository(User);
    const slotRepo = dataSource.getRepository(Slot);
    const redis = getTestRedis(app);
    const server = app.getHttpServer();

    const user = await userRepo.save(
      userRepo.create({
        clerkId: `flow_clerk_${Date.now()}`,
        email: `flow-${Date.now()}@test.local`,
        name: 'Flow User',
        role: UserRole.User,
      }),
    );
    const slot = await saveOpenSlot(slotRepo, 'Flow slot');

    const slotsRes = await request(server).get('/api/slots').expect(200);
    const slotsBody = slotsRes.body as { data: { items: { id: string }[] } };
    expect(slotsBody.data.items.some((s) => s.id === slot.id)).toBe(true);

    expect(await redis.get(SLOTS_LIST_CACHE_KEY)).not.toBeNull();

    const bookingRes = await request(server)
      .post('/api/bookings')
      .set('x-test-user-id', user.id)
      .send({ slotId: slot.id })
      .expect(201);

    const booking = (
      bookingRes.body as { data: { id: string; status: string } }
    ).data;
    expect(booking.status).toBe(BookingStatus.Pending);
    expect(await redis.get(SLOTS_LIST_CACHE_KEY)).toBeNull();

    const checkoutRes = await request(server)
      .post(`/api/bookings/${booking.id}/checkout`)
      .set('x-test-user-id', user.id)
      .expect(201);

    const checkout = checkoutRes.body as {
      data: { checkoutUrl: string; sessionId: string };
    };
    expect(checkout.data.checkoutUrl).toContain('checkout.stripe.test');
    expect(checkout.data.sessionId).toBe('cs_test_e2e');
    expect(stripeMock.createCheckoutSession).toHaveBeenCalled();

    const event = buildPaymentIntentSucceededEvent({
      bookingId: booking.id,
      slot,
      eventId: `evt_flow_${Date.now()}`,
      paymentIntentId: `pi_flow_${Date.now()}`,
    });
    stripeMock.constructWebhookEvent.mockReturnValue(event);

    const webhookPayload = JSON.stringify({ id: event.id, type: event.type });
    await request(server)
      .post('/webhooks/stripe')
      .set('stripe-signature', 'sig_test')
      .set('Content-Type', 'application/json')
      .send(webhookPayload)
      .expect(200);

    expect(stripeMock.constructWebhookEvent).toHaveBeenCalled();

    const confirmedRes = await request(server)
      .get(`/api/bookings/${booking.id}`)
      .set('x-test-user-id', user.id)
      .expect(200);

    const confirmed = confirmedRes.body as {
      data: { status: string; stripePaymentIntentId?: string };
    };
    expect(confirmed.data.status).toBe(BookingStatus.Confirmed);
    expect(confirmed.data.stripePaymentIntentId).toBe(event.data.object.id);

    const paymentCount = await dataSource.getRepository(Payment).count({
      where: { bookingId: booking.id, status: PaymentStatus.Succeeded },
    });
    expect(paymentCount).toBe(1);
  });
});
