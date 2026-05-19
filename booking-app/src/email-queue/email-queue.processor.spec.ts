import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Booking, BookingStatus } from '../bookings/booking.entity';
import { ResendMailService } from '../mail/resend-mail.service';
import type { BookingEmailJobData } from './email-jobs.types';
import { EmailQueueProcessor } from './email-queue.processor';
import {
  JOB_BOOKING_CANCELLED,
  JOB_BOOKING_CONFIRMATION,
  JOB_BOOKING_REMINDER,
} from './queue.constants';

function makeJob(
  name: string,
  data: BookingEmailJobData,
): Job<BookingEmailJobData, unknown, string> {
  return {
    name,
    id: 'job-1',
    data,
  } as Job<BookingEmailJobData, unknown, string>;
}

describe('EmailQueueProcessor', () => {
  let processor: EmailQueueProcessor;
  let mail: {
    sendBookingConfirmation: jest.Mock;
    sendBookingCancelled: jest.Mock;
    sendBookingReminder: jest.Mock;
  };
  let bookingsRepo: {
    findOne: jest.Mock;
    save: jest.Mock;
  };

  const sampleData: BookingEmailJobData = {
    to: 'user@test.com',
    recipientName: 'User',
    bookingId: 'bid-1',
    slotTitle: 'Slot',
    slotStartIso: '2026-01-01T10:00:00.000Z',
    slotEndIso: '2026-01-01T11:00:00.000Z',
  };

  beforeEach(async () => {
    mail = {
      sendBookingConfirmation: jest.fn().mockResolvedValue(undefined),
      sendBookingCancelled: jest.fn().mockResolvedValue(undefined),
      sendBookingReminder: jest.fn().mockResolvedValue(undefined),
    };
    bookingsRepo = {
      findOne: jest.fn(),
      save: jest.fn().mockImplementation((b) => Promise.resolve(b)),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        EmailQueueProcessor,
        { provide: ResendMailService, useValue: mail },
        { provide: getRepositoryToken(Booking), useValue: bookingsRepo },
      ],
    }).compile();

    processor = moduleRef.get(EmailQueueProcessor);
  });

  it('routes booking-confirmation to sendBookingConfirmation', async () => {
    const job = makeJob(JOB_BOOKING_CONFIRMATION, sampleData);

    await processor.process(job);

    expect(mail.sendBookingConfirmation).toHaveBeenCalledWith(sampleData);
    expect(mail.sendBookingCancelled).not.toHaveBeenCalled();
    expect(bookingsRepo.findOne).not.toHaveBeenCalled();
  });

  it('routes booking-cancelled to sendBookingCancelled', async () => {
    const job = makeJob(JOB_BOOKING_CANCELLED, sampleData);

    await processor.process(job);

    expect(mail.sendBookingCancelled).toHaveBeenCalledWith(sampleData);
    expect(mail.sendBookingConfirmation).not.toHaveBeenCalled();
    expect(bookingsRepo.findOne).not.toHaveBeenCalled();
  });

  it('routes booking-reminder to sendBookingReminder and sets reminderSentAt', async () => {
    bookingsRepo.findOne.mockResolvedValue({
      id: 'bid-1',
      status: BookingStatus.Confirmed,
      reminderSentAt: null,
      user: { email: 'user@test.com', name: 'User' },
      slot: {
        title: 'Slot',
        startTime: new Date('2026-01-01T10:00:00.000Z'),
        endTime: new Date('2026-01-01T11:00:00.000Z'),
      },
    });

    await processor.process(makeJob(JOB_BOOKING_REMINDER, sampleData));

    expect(mail.sendBookingReminder).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@test.com',
        bookingId: 'bid-1',
        slotTitle: 'Slot',
      }),
    );
    expect(bookingsRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        reminderSentAt: expect.any(Date) as Date,
      }),
    );
  });

  it('skips reminder when booking is not eligible', async () => {
    bookingsRepo.findOne.mockResolvedValue({
      id: 'bid-1',
      status: BookingStatus.Cancelled,
      reminderSentAt: null,
      user: { email: 'user@test.com', name: 'User' },
      slot: {
        title: 'Slot',
        startTime: new Date(),
        endTime: new Date(),
      },
    });

    await processor.process(makeJob(JOB_BOOKING_REMINDER, sampleData));

    expect(mail.sendBookingReminder).not.toHaveBeenCalled();
    expect(bookingsRepo.save).not.toHaveBeenCalled();
  });

  it('logs a warning for unknown job names', async () => {
    const warn = jest.spyOn(processor['logger'], 'warn');

    await processor.process(makeJob('unknown-job', sampleData));

    expect(warn).toHaveBeenCalledWith('Unknown job name: unknown-job');
    expect(mail.sendBookingConfirmation).not.toHaveBeenCalled();
    expect(mail.sendBookingCancelled).not.toHaveBeenCalled();
  });
});
