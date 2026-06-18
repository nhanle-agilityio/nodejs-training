import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DataSource, Repository } from 'typeorm';
import { App } from 'supertest/types';
import { Booking, BookingStatus } from '../src/bookings/booking.entity';
import { Payment, PaymentStatus } from '../src/payments/payment.entity';
import { Slot } from '../src/slots/slot.entity';
import { User, UserRole } from '../src/users/user.entity';
import {
  cleanBookingE2eTables,
  flushRedisTestKeys,
  getTestRedis,
  saveOpenSlot,
} from './bookings-e2e-helpers';
import { createTestApp } from './create-test-app';
import {
  buildPaymentIntentSucceededEvent,
  type StripeMock,
} from './stripe-mock';

const buildRefundUpdatedEvent = (options: {
  refundId: string;
  bookingId: string;
  status?: string;
}) => ({
  id: `evt_refund_${Date.now()}`,
  type: 'refund.updated',
  data: {
    object: {
      id: options.refundId,
      status: options.status ?? 'succeeded',
      metadata: { bookingId: options.bookingId },
    },
  },
});

describe('StripeWebhookController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;
  let stripeMock: StripeMock;
  let userRepo: Repository<User>;
  let slotRepo: Repository<Slot>;
  let bookingRepo: Repository<Booking>;
  let paymentRepo: Repository<Payment>;

  beforeAll(async () => {
    ({ app, stripeMock } = await createTestApp());
    dataSource = app.get(DataSource);
    userRepo = dataSource.getRepository(User);
    slotRepo = dataSource.getRepository(Slot);
    bookingRepo = dataSource.getRepository(Booking);
    paymentRepo = dataSource.getRepository(Payment);
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  beforeEach(async () => {
    await cleanBookingE2eTables(dataSource);
    await flushRedisTestKeys(getTestRedis(app));
    jest.clearAllMocks();
  });

  const saveTestUser = (suffix: string) =>
    userRepo.save(
      userRepo.create({
        clerkId: `wh_clerk_${suffix}`,
        email: `wh-${suffix}@test.local`,
        name: 'Webhook Test User',
        role: UserRole.User,
      }),
    );

  const postWebhook = (event: unknown) =>
    request(app.getHttpServer())
      .post('/webhooks/stripe')
      .set('stripe-signature', 'sig_test')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ id: (event as { id: string }).id }));

  it('rejects requests with no stripe-signature header', async () => {
    await request(app.getHttpServer())
      .post('/webhooks/stripe')
      .set('Content-Type', 'application/json')
      .send('{}')
      .expect(400);
  });

  it('rejects requests with an invalid Stripe signature', async () => {
    stripeMock.constructWebhookEvent.mockImplementationOnce(() => {
      throw new Error('No signatures found matching the expected signature');
    });

    await request(app.getHttpServer())
      .post('/webhooks/stripe')
      .set('stripe-signature', 'sig_bad')
      .set('Content-Type', 'application/json')
      .send('{}')
      .expect(400);
  });

  it('confirms a pending booking and records a payment on payment_intent.succeeded', async () => {
    const user = await saveTestUser(`${Date.now()}_confirm`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await bookingRepo.save(
      bookingRepo.create({
        userId: user.id,
        slotId: slot.id,
        status: BookingStatus.Pending,
      }),
    );

    const event = buildPaymentIntentSucceededEvent({
      bookingId: booking.id,
      slot,
      eventId: `evt_confirm_${Date.now()}`,
    });
    stripeMock.constructWebhookEvent.mockReturnValue(event);

    await postWebhook(event).expect(200);

    const updatedBooking = await bookingRepo.findOneBy({ id: booking.id });
    expect(updatedBooking?.status).toBe(BookingStatus.Confirmed);

    const payment = await paymentRepo.findOneBy({ bookingId: booking.id });
    expect(payment?.status).toBe(PaymentStatus.Succeeded);
    expect(payment?.stripeEventId).toBe(event.id);
  });

  it('is idempotent — a duplicate payment_intent.succeeded does not create a second payment', async () => {
    const user = await saveTestUser(`${Date.now()}_dup`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await bookingRepo.save(
      bookingRepo.create({
        userId: user.id,
        slotId: slot.id,
        status: BookingStatus.Pending,
      }),
    );

    const event = buildPaymentIntentSucceededEvent({
      bookingId: booking.id,
      slot,
      eventId: `evt_dup_${Date.now()}`,
    });
    stripeMock.constructWebhookEvent.mockReturnValue(event);

    await postWebhook(event).expect(200);
    await postWebhook(event).expect(200);

    const count = await paymentRepo.count({ where: { bookingId: booking.id } });
    expect(count).toBe(1);
  });

  it('accepts payment_intent.succeeded for an already-confirmed booking without creating a duplicate payment', async () => {
    const user = await saveTestUser(`${Date.now()}_already`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await bookingRepo.save(
      bookingRepo.create({
        userId: user.id,
        slotId: slot.id,
        status: BookingStatus.Confirmed,
      }),
    );

    const event = buildPaymentIntentSucceededEvent({
      bookingId: booking.id,
      slot,
      eventId: `evt_already_${Date.now()}`,
    });
    stripeMock.constructWebhookEvent.mockReturnValue(event);

    await postWebhook(event).expect(200);

    const count = await paymentRepo.count({ where: { bookingId: booking.id } });
    expect(count).toBe(0);

    const updatedBooking = await bookingRepo.findOneBy({ id: booking.id });
    expect(updatedBooking?.status).toBe(BookingStatus.Confirmed);
  });

  it('marks booking and payment as refunded on refund.updated with status=succeeded', async () => {
    const user = await saveTestUser(`${Date.now()}_refund`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await bookingRepo.save(
      bookingRepo.create({
        userId: user.id,
        slotId: slot.id,
        status: BookingStatus.RefundPending,
      }),
    );
    const refundId = `re_test_${Date.now()}`;
    const payment = await paymentRepo.save(
      paymentRepo.create({
        bookingId: booking.id,
        stripeEventId: `evt_orig_${Date.now()}`,
        stripeRefundId: refundId,
        amount: slot.price,
        status: PaymentStatus.Succeeded,
      }),
    );

    const event = buildRefundUpdatedEvent({ refundId, bookingId: booking.id });
    stripeMock.constructWebhookEvent.mockReturnValue(event);

    await postWebhook(event).expect(200);

    const updatedBooking = await bookingRepo.findOneBy({ id: booking.id });
    expect(updatedBooking?.status).toBe(BookingStatus.Refunded);

    const updatedPayment = await paymentRepo.findOneBy({ id: payment.id });
    expect(updatedPayment?.status).toBe(PaymentStatus.Refunded);
  });

  it('ignores refund.updated when the refund status is not succeeded', async () => {
    const user = await saveTestUser(`${Date.now()}_refund_pending`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await bookingRepo.save(
      bookingRepo.create({
        userId: user.id,
        slotId: slot.id,
        status: BookingStatus.RefundPending,
      }),
    );
    const refundId = `re_pending_${Date.now()}`;
    await paymentRepo.save(
      paymentRepo.create({
        bookingId: booking.id,
        stripeEventId: `evt_orig_${Date.now()}`,
        stripeRefundId: refundId,
        amount: slot.price,
        status: PaymentStatus.Succeeded,
      }),
    );

    const event = buildRefundUpdatedEvent({
      refundId,
      bookingId: booking.id,
      status: 'pending',
    });
    stripeMock.constructWebhookEvent.mockReturnValue(event);

    await postWebhook(event).expect(200);

    const updatedBooking = await bookingRepo.findOneBy({ id: booking.id });
    expect(updatedBooking?.status).toBe(BookingStatus.RefundPending);
  });

  it('accepts unknown event types without error', async () => {
    const unknownEvent = {
      id: `evt_unknown_${Date.now()}`,
      type: 'customer.subscription.created',
      data: { object: {} },
    };
    stripeMock.constructWebhookEvent.mockReturnValue(unknownEvent);

    const res = await postWebhook(unknownEvent).expect(200);

    expect(res.body).toEqual({
      data: {
        received: true,
        type: 'customer.subscription.created',
      },
    });
  });
});
