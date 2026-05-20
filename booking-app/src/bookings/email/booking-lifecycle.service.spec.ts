import { getQueueToken } from '@nestjs/bullmq';
import { Test, TestingModule } from '@nestjs/testing';
import { QUEUE_EMAIL } from '../../email-queue/queue.constants';
import { Booking, BookingStatus } from '../booking.entity';
import { BookingCancellationReason } from './booking-cancellation-reason';
import {
  JOB_BOOKING_CANCELLED,
  JOB_BOOKING_CONFIRMED,
} from './booking-email.constants';
import { BookingLifecycleService } from './booking-lifecycle.service';
import { BookingReminderQueueService } from './booking-reminder-queue.service';

describe('BookingLifecycleService', () => {
  let service: BookingLifecycleService;
  let emailQueue: { add: jest.Mock };
  let reminderQueue: {
    upsertReminderJob: jest.Mock;
    removeReminderJob: jest.Mock;
  };

  const booking = {
    id: 'b1111111-1111-1111-1111-111111111111',
    status: BookingStatus.Pending,
    user: { email: 'guest@test.com', name: 'Guest' },
    slot: {
      title: 'Yoga',
      startTime: new Date('2026-06-15T14:00:00.000Z'),
      endTime: new Date('2026-06-15T15:00:00.000Z'),
    },
  } as Booking;

  beforeEach(async () => {
    emailQueue = { add: jest.fn().mockResolvedValue(undefined) };
    reminderQueue = {
      upsertReminderJob: jest.fn().mockResolvedValue(true),
      removeReminderJob: jest.fn().mockResolvedValue(undefined),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BookingLifecycleService,
        { provide: getQueueToken(QUEUE_EMAIL), useValue: emailQueue },
        { provide: BookingReminderQueueService, useValue: reminderQueue },
      ],
    }).compile();

    service = moduleRef.get(BookingLifecycleService);
  });

  it('onBookingCreated enqueues confirmation email', async () => {
    await service.onBookingCreated(booking);

    expect(emailQueue.add).toHaveBeenCalledWith(
      JOB_BOOKING_CONFIRMED,
      expect.objectContaining({ bookingId: booking.id }),
      expect.objectContaining({ jobId: `booking-confirmed-${booking.id}` }),
    );
    expect(reminderQueue.upsertReminderJob).not.toHaveBeenCalled();
  });

  it('onBookingConfirmed enqueues confirmation and upserts reminder', async () => {
    const confirmed = {
      ...booking,
      status: BookingStatus.Confirmed,
    } as Booking;

    await service.onBookingConfirmed(confirmed);

    expect(emailQueue.add).toHaveBeenCalledWith(
      JOB_BOOKING_CONFIRMED,
      expect.objectContaining({ bookingId: booking.id }),
      expect.objectContaining({
        jobId: `booking-confirmed-${booking.id}`,
        attempts: 5,
      }),
    );
    expect(reminderQueue.upsertReminderJob).toHaveBeenCalledWith(confirmed);
  });

  it('onBookingConfirmed skips email when user has no email', async () => {
    await service.onBookingConfirmed({
      ...booking,
      status: BookingStatus.Confirmed,
      user: { email: '', name: 'Guest' },
    } as Booking);

    expect(emailQueue.add).not.toHaveBeenCalled();
    expect(reminderQueue.upsertReminderJob).toHaveBeenCalled();
  });

  it('onBookingCancelled removes reminder even when email is skipped', async () => {
    await service.onBookingCancelled(
      { ...booking, user: { email: '', name: 'Guest' } } as Booking,
      BookingCancellationReason.UserCancelled,
    );

    expect(reminderQueue.removeReminderJob).toHaveBeenCalledWith(booking.id);
    expect(emailQueue.add).not.toHaveBeenCalled();
  });

  it('onBookingCancelled removes reminder and enqueues cancelled email with reason', async () => {
    await service.onBookingCancelled(
      booking,
      BookingCancellationReason.PaymentTimeout,
    );

    expect(reminderQueue.removeReminderJob).toHaveBeenCalledWith(booking.id);
    expect(emailQueue.add).toHaveBeenCalledWith(
      JOB_BOOKING_CANCELLED,
      expect.objectContaining({
        bookingId: booking.id,
        cancellationReason: BookingCancellationReason.PaymentTimeout,
      }),
      expect.objectContaining({ jobId: `booking-cancelled-${booking.id}` }),
    );
  });
});
