import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import Redlock from 'redlock';
import { Booking, BookingStatus } from './booking.entity';
import { Slot, SlotStatus } from '../slots/slot.entity';
import { REDLOCK } from '../redis/redis.module';
import { toBookingEmailJobData } from 'src/email-queue/email-job-payload.util';
import { BookingEmailJobData } from 'src/email-queue/email-jobs.types';
import {
  JOB_BOOKING_CANCELLED,
  JOB_BOOKING_CONFIRMATION,
  QUEUE_EMAIL,
} from 'src/email-queue/queue.constants';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
    private readonly dataSource: DataSource,
    @Inject(REDLOCK)
    private readonly redlock: Redlock,
    @InjectQueue(QUEUE_EMAIL)
    private readonly emailQueue: Queue<BookingEmailJobData, any, string>,
  ) {}

  async createBooking(userId: string, slotId: string): Promise<Booking> {
    const lockKey = `booking:slot:${slotId}`;
    const lockTtl = 5_000; // 5 seconds

    // Redlock
    let lock: Awaited<ReturnType<Redlock['acquire']>>;
    try {
      lock = await this.redlock.acquire([lockKey], lockTtl);
    } catch {
      throw new ConflictException('Slot is currently being booked — try again');
    }

    try {
      const saved = await this.dataSource.transaction(async (manager) => {
        // Lock the slot row to prevent concurrent bookings
        const slot = await manager
          .createQueryBuilder(Slot, 'slot')
          .setLock('pessimistic_write')
          .where('slot.id = :slotId', { slotId })
          .andWhere('slot.deletedAt IS NULL')
          .getOne();

        if (!slot) {
          throw new NotFoundException('Slot not found');
        }
        if (slot.status !== SlotStatus.Open) {
          throw new BadRequestException('Slot is not open for booking');
        }

        // Check for existing active booking on this slot
        const existing = await manager.findOne(Booking, {
          where: [
            { slotId, status: BookingStatus.Pending },
            { slotId, status: BookingStatus.Confirmed },
          ],
        });
        if (existing) {
          throw new ConflictException('Slot already has an active booking');
        }

        // Create the booking
        const booking = manager.create(Booking, {
          userId,
          slotId,
          status: BookingStatus.Pending,
        });

        return manager.save(booking);
      });

      const bookingRow = await this.bookings.findOne({
        where: { id: saved.id },
        relations: ['user', 'slot'],
      });

      if (bookingRow?.user?.email && bookingRow.slot) {
        await this.emailQueue.add(
          JOB_BOOKING_CONFIRMATION,
          toBookingEmailJobData(bookingRow),
          {
            jobId: `booking-confirmation-${bookingRow.id}`,
            attempts: 5,
            backoff: { type: 'exponential', delay: 30_000 },
          },
        );
      }

      return saved;
    } finally {
      await lock.release().catch((err: Error) => {
        this.logger.warn(
          `Failed to release Redlock for ${lockKey}: ${err.message}`,
        );
      });
    }
  }

  async getAllBookings(options: {
    status?: BookingStatus;
    userId?: string;
    slotId?: string;
    page: number;
    limit: number;
  }): Promise<{ items: Booking[]; total: number }> {
    const where: FindOptionsWhere<Booking> = {};
    if (options.status) where.status = options.status;
    if (options.userId) where.userId = options.userId;
    if (options.slotId) where.slotId = options.slotId;

    const [items, total] = await this.bookings.findAndCount({
      where,
      relations: ['slot', 'user'],
      order: { createdAt: 'DESC' },
      skip: (options.page - 1) * options.limit,
      take: options.limit,
    });

    return { items, total };
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return this.bookings.find({
      where: { userId },
      relations: ['slot'],
      order: { createdAt: 'DESC' },
    });
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookings.findOne({
      where: { id },
      relations: ['slot'],
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async cancelBooking(
    id: string,
    userId: string,
    isAdmin: boolean,
  ): Promise<Booking> {
    const booking = await this.getBookingById(id);

    if (!isAdmin && booking.userId !== userId) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.status !== BookingStatus.Pending) {
      throw new BadRequestException(
        `Cannot cancel a booking with status ${booking.status}`,
      );
    }

    booking.status = BookingStatus.Cancelled;
    const bookingRow = await this.bookings.save(booking);

    const bookingForCancelEmail = await this.bookings.findOne({
      where: { id: bookingRow.id },
      relations: ['user', 'slot'],
    });

    if (bookingForCancelEmail?.user?.email && bookingForCancelEmail.slot) {
      await this.emailQueue.add(
        JOB_BOOKING_CANCELLED,
        toBookingEmailJobData(bookingForCancelEmail),
        {
          jobId: `booking-cancelled-${bookingForCancelEmail.id}`,
          attempts: 5,
          backoff: { type: 'exponential', delay: 30_000 },
        },
      );
    }

    return bookingRow;
  }
}
