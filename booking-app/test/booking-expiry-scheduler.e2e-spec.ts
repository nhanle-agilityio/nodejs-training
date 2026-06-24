import { INestApplication } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { App } from 'supertest/types';
import { Booking, BookingStatus } from '../src/bookings/booking.entity';
import { Payment, PaymentStatus } from '../src/payments/payment.entity';
import { PendingBookingExpiryScheduler } from '../src/bookings/schedulers/booking-expiry.scheduler';
import { Slot } from '../src/slots/slot.entity';
import { User, UserRole } from '../src/users/user.entity';
import {
  cleanBookingE2eTables,
  flushRedisTestKeys,
  getTestRedis,
  saveOpenSlot,
} from './bookings-e2e-helpers';
import { createTestApp } from './create-test-app';
import type { StripeMock } from './stripe-mock';

const TWENTY_MIN_AGO = new Date(Date.now() - 20 * 60 * 1000);
const FIVE_MIN_AGO = new Date(Date.now() - 5 * 60 * 1000);

describe('PendingBookingExpiryScheduler (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;
  let stripeMock: StripeMock;
  let scheduler: PendingBookingExpiryScheduler;
  let userRepo: Repository<User>;
  let slotRepo: Repository<Slot>;
  let bookingRepo: Repository<Booking>;
  let paymentRepo: Repository<Payment>;

  beforeAll(async () => {
    ({ app, stripeMock } = await createTestApp());
    dataSource = app.get(DataSource);
    scheduler = app.get(PendingBookingExpiryScheduler);
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
        clerkId: `sched_clerk_${suffix}`,
        email: `sched-${suffix}@test.local`,
        name: 'Scheduler Test User',
        role: UserRole.User,
      }),
    );

  const savePendingBooking = (userId: string, slotId: string) =>
    bookingRepo.save(
      bookingRepo.create({ userId, slotId, status: BookingStatus.Pending }),
    );

  const setCreatedAt = (bookingId: string, date: Date) =>
    dataSource.query('UPDATE bookings SET created_at = $1 WHERE id = $2', [
      date,
      bookingId,
    ]);

  it('cancels an expired pending booking and expires its Stripe checkout session', async () => {
    const user = await saveTestUser(`${Date.now()}_1`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await savePendingBooking(user.id, slot.id);
    await bookingRepo.update(booking.id, {
      stripeSessionId: 'cs_test_expired',
    });
    await setCreatedAt(booking.id, TWENTY_MIN_AGO);

    await scheduler.expireStalePendingBookings();

    const updated = await bookingRepo.findOneBy({ id: booking.id });
    expect(updated?.status).toBe(BookingStatus.Cancelled);
    expect(stripeMock.expireCheckoutSession).toHaveBeenCalledWith(
      'cs_test_expired',
    );
  });

  it('cancels an expired pending booking without calling Stripe when no session id', async () => {
    const user = await saveTestUser(`${Date.now()}_2`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await savePendingBooking(user.id, slot.id);
    await setCreatedAt(booking.id, TWENTY_MIN_AGO);

    await scheduler.expireStalePendingBookings();

    const updated = await bookingRepo.findOneBy({ id: booking.id });
    expect(updated?.status).toBe(BookingStatus.Cancelled);
    expect(stripeMock.expireCheckoutSession).not.toHaveBeenCalled();
  });

  it('does not cancel a pending booking within the payment window', async () => {
    const user = await saveTestUser(`${Date.now()}_3`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await savePendingBooking(user.id, slot.id);
    await setCreatedAt(booking.id, FIVE_MIN_AGO);

    await scheduler.expireStalePendingBookings();

    const updated = await bookingRepo.findOneBy({ id: booking.id });
    expect(updated?.status).toBe(BookingStatus.Pending);
  });

  it('does not cancel a confirmed booking even if older than the TTL', async () => {
    const user = await saveTestUser(`${Date.now()}_4`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await savePendingBooking(user.id, slot.id);
    await bookingRepo.update(booking.id, { status: BookingStatus.Confirmed });
    await setCreatedAt(booking.id, TWENTY_MIN_AGO);

    await scheduler.expireStalePendingBookings();

    const updated = await bookingRepo.findOneBy({ id: booking.id });
    expect(updated?.status).toBe(BookingStatus.Confirmed);
  });

  it('does not cancel a pending booking that has a succeeded payment', async () => {
    const user = await saveTestUser(`${Date.now()}_5`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await savePendingBooking(user.id, slot.id);
    await setCreatedAt(booking.id, TWENTY_MIN_AGO);
    await paymentRepo.save(
      paymentRepo.create({
        bookingId: booking.id,
        stripeEventId: `evt_preexist_${Date.now()}`,
        amount: slot.price,
        status: PaymentStatus.Succeeded,
      }),
    );

    await scheduler.expireStalePendingBookings();

    const updated = await bookingRepo.findOneBy({ id: booking.id });
    expect(updated?.status).toBe(BookingStatus.Pending);
  });

  it('cancels multiple expired pending bookings in a single run', async () => {
    const user = await saveTestUser(`${Date.now()}_6`);
    const [slot1, slot2, slot3] = await Promise.all([
      saveOpenSlot(slotRepo, 'batch slot 1'),
      saveOpenSlot(slotRepo, 'batch slot 2'),
      saveOpenSlot(slotRepo, 'batch slot 3'),
    ]);
    const [b1, b2, b3] = await Promise.all([
      savePendingBooking(user.id, slot1.id),
      savePendingBooking(user.id, slot2.id),
      savePendingBooking(user.id, slot3.id),
    ]);
    await Promise.all([
      setCreatedAt(b1.id, TWENTY_MIN_AGO),
      setCreatedAt(b2.id, TWENTY_MIN_AGO),
      setCreatedAt(b3.id, TWENTY_MIN_AGO),
    ]);

    await scheduler.expireStalePendingBookings();

    const [u1, u2, u3] = await Promise.all([
      bookingRepo.findOneBy({ id: b1.id }),
      bookingRepo.findOneBy({ id: b2.id }),
      bookingRepo.findOneBy({ id: b3.id }),
    ]);
    expect(u1?.status).toBe(BookingStatus.Cancelled);
    expect(u2?.status).toBe(BookingStatus.Cancelled);
    expect(u3?.status).toBe(BookingStatus.Cancelled);
  });

  it('still cancels the booking when Stripe session expiry throws', async () => {
    const user = await saveTestUser(`${Date.now()}_7`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await savePendingBooking(user.id, slot.id);
    await bookingRepo.update(booking.id, {
      stripeSessionId: 'cs_test_will_fail',
    });
    await setCreatedAt(booking.id, TWENTY_MIN_AGO);
    stripeMock.expireCheckoutSession.mockRejectedValueOnce(
      new Error('Stripe down'),
    );

    await scheduler.expireStalePendingBookings();

    const updated = await bookingRepo.findOneBy({ id: booking.id });
    expect(updated?.status).toBe(BookingStatus.Cancelled);
  });

  it('is idempotent — running the scheduler twice on the same booking does not error', async () => {
    const user = await saveTestUser(`${Date.now()}_8`);
    const slot = await saveOpenSlot(slotRepo);
    const booking = await savePendingBooking(user.id, slot.id);
    await setCreatedAt(booking.id, TWENTY_MIN_AGO);

    await scheduler.expireStalePendingBookings();
    await scheduler.expireStalePendingBookings();

    const updated = await bookingRepo.findOneBy({ id: booking.id });
    expect(updated?.status).toBe(BookingStatus.Cancelled);
  });
});
