import { getQueueToken } from '@nestjs/bullmq';
import { Test, TestingModule } from '@nestjs/testing';
import { QUEUE_EMAIL } from '../../email-queue/queue.constants';
import { Booking, BookingStatus } from '../booking.entity';
import { JOB_BOOKING_REMINDER } from './booking-email.constants';
import { BookingReminderQueueService } from './booking-reminder-queue.service';

describe('BookingReminderQueueService', () => {
  let service: BookingReminderQueueService;
  let emailQueue: {
    getJob: jest.Mock;
    add: jest.Mock;
  };

  const booking = {
    id: 'b1111111-1111-1111-1111-111111111111',
    status: BookingStatus.Confirmed,
    reminderSentAt: null,
    user: { email: 'guest@test.com', name: 'Guest' },
    slot: {
      title: 'Slot name 1',
      startTime: new Date('2026-06-15T14:00:00.000Z'),
      endTime: new Date('2026-06-15T15:00:00.000Z'),
    },
  } as Booking;

  beforeEach(async () => {
    emailQueue = {
      getJob: jest.fn().mockResolvedValue(null),
      add: jest.fn().mockResolvedValue(undefined),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BookingReminderQueueService,
        { provide: getQueueToken(QUEUE_EMAIL), useValue: emailQueue },
      ],
    }).compile();

    service = moduleRef.get(BookingReminderQueueService);
  });

  it('adds a new delayed reminder job when none exists', async () => {
    jest.useFakeTimers({ now: new Date('2026-06-10T12:00:00.000Z') });

    const ok = await service.upsertReminderJob(booking);

    expect(ok).toBe(true);
    expect(emailQueue.add).toHaveBeenCalledWith(
      JOB_BOOKING_REMINDER,
      expect.objectContaining({ bookingId: booking.id }),
      expect.objectContaining({
        jobId: `reminder-${booking.id}`,
        attempts: 5,
        delay: expect.any(Number) as number,
      }),
    );

    jest.useRealTimers();
  });

  it('does not enqueue when booking is PENDING', async () => {
    jest.useFakeTimers({ now: new Date('2026-06-10T12:00:00.000Z') });

    const ok = await service.upsertReminderJob({
      ...booking,
      status: BookingStatus.Pending,
    });

    expect(ok).toBe(false);
    expect(emailQueue.add).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('updates delay when a delayed job already exists', async () => {
    jest.useFakeTimers({ now: new Date('2026-06-10T12:00:00.000Z') });

    const existing = {
      getState: jest.fn().mockResolvedValue('delayed'),
      updateData: jest.fn().mockResolvedValue(undefined),
      changeDelay: jest.fn().mockResolvedValue(undefined),
    };
    emailQueue.getJob.mockResolvedValue(existing);

    const ok = await service.upsertReminderJob(booking);

    expect(ok).toBe(true);
    expect(emailQueue.add).not.toHaveBeenCalled();
    expect(existing.changeDelay).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('returns false when booking is not reminder-eligible', async () => {
    const ok = await service.upsertReminderJob({
      ...booking,
      reminderSentAt: new Date('2026-06-09T12:00:00.000Z'),
    });

    expect(ok).toBe(false);
    expect(emailQueue.add).not.toHaveBeenCalled();
    expect(emailQueue.getJob).not.toHaveBeenCalled();
  });

  it('leaves active jobs untouched', async () => {
    const existing = {
      getState: jest.fn().mockResolvedValue('active'),
      changeDelay: jest.fn(),
    };
    emailQueue.getJob.mockResolvedValue(existing);

    const ok = await service.upsertReminderJob(booking);

    expect(ok).toBe(true);
    expect(emailQueue.add).not.toHaveBeenCalled();
    expect(existing.changeDelay).not.toHaveBeenCalled();
  });

  it('replaces completed jobs with a fresh delayed job', async () => {
    jest.useFakeTimers({ now: new Date('2026-06-10T12:00:00.000Z') });

    const existing = {
      getState: jest.fn().mockResolvedValue('completed'),
      remove: jest.fn().mockResolvedValue(undefined),
    };
    emailQueue.getJob.mockResolvedValue(existing);

    const ok = await service.upsertReminderJob(booking);

    expect(ok).toBe(true);
    expect(existing.remove).toHaveBeenCalled();
    expect(emailQueue.add).toHaveBeenCalledWith(
      JOB_BOOKING_REMINDER,
      expect.objectContaining({ bookingId: booking.id }),
      expect.objectContaining({ jobId: `reminder-${booking.id}` }),
    );

    jest.useRealTimers();
  });

  it('removeReminderJob skips active jobs', async () => {
    const job = {
      getState: jest.fn().mockResolvedValue('active'),
      remove: jest.fn(),
    };
    emailQueue.getJob.mockResolvedValue(job);

    await service.removeReminderJob(booking.id);

    expect(job.remove).not.toHaveBeenCalled();
  });

  it('removeReminderJob removes non-active jobs', async () => {
    const job = {
      getState: jest.fn().mockResolvedValue('delayed'),
      remove: jest.fn().mockResolvedValue(undefined),
    };
    emailQueue.getJob.mockResolvedValue(job);

    await service.removeReminderJob(booking.id);

    expect(job.remove).toHaveBeenCalled();
  });
});
