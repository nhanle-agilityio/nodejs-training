import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import Redlock from 'redlock';
import { Booking, BookingStatus } from './booking.entity';
import { Slot, SlotStatus } from '../slots/slot.entity';
import { REDLOCK } from '../redis/redis.tokens';
import { BookingCancellationReason } from './email/booking-cancellation-reason';
import { BookingLifecycleService } from './email/booking-lifecycle.service';
import type { BookingWithEmailRelations } from './email/booking-email.types';
import { PaymentsService } from '../payments/payments.service';
import { resolvePagination } from '../common/pagination/resolve-pagination';
import { SlotsCacheService } from '../slots/slots-cache.service';
import { BookingsQueryDto } from './dto/bookings-query.dto';
import { MyBookingsQueryDto } from './dto/my-bookings-query.dto';
import { PaginatedResult } from '../common/pagination/map-paginated-items';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly bookings: Repository<Booking>,
    private readonly dataSource: DataSource,
    @Inject(REDLOCK)
    private readonly redlock: Redlock,
    private readonly lifecycle: BookingLifecycleService,
    @Inject(forwardRef(() => PaymentsService))
    private readonly paymentsService: PaymentsService,
    private readonly slotsCache: SlotsCacheService,
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
        if (slot.startTime <= new Date()) {
          throw new BadRequestException(
            'Cannot book a slot that has already started',
          );
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

      // Invalidate the slot list cache whenever a new booking is created
      await this.slotsCache.invalidateAll();
      return saved;
    } finally {
      await lock.release().catch((err: Error) => {
        this.logger.warn(
          `Failed to release Redlock for ${lockKey}: ${err.message}`,
        );
      });
    }
  }

  async getAllBookings(
    query: Pick<
      BookingsQueryDto,
      'status' | 'userId' | 'slotId' | 'page' | 'limit'
    >,
  ): Promise<PaginatedResult<Booking>> {
    const { page, limit, skip, take } = resolvePagination(query);
    const where: FindOptionsWhere<Booking> = {};
    if (query.status) where.status = query.status;
    if (query.userId) where.userId = query.userId;
    if (query.slotId) where.slotId = query.slotId;

    const [items, total] = await this.bookings.findAndCount({
      where,
      relations: ['slot', 'user'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    return { items, total, page, limit };
  }

  async getBookingsByUser(
    query: Pick<MyBookingsQueryDto, 'status' | 'page' | 'limit'> & {
      userId: string;
    },
  ): Promise<PaginatedResult<Booking>> {
    const { page, limit, skip, take } = resolvePagination(query);
    const where: FindOptionsWhere<Booking> = { userId: query.userId };
    if (query.status) where.status = query.status;

    const [items, total] = await this.bookings.findAndCount({
      where,
      relations: ['slot'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    return { items, total, page, limit };
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

    const reason = isAdmin
      ? BookingCancellationReason.AdminCancelled
      : BookingCancellationReason.UserCancelled;

    const hasRefundablePayment =
      await this.paymentsService.hasRefundablePayment(id);

    if (booking.status === BookingStatus.Confirmed) {
      if (!hasRefundablePayment) {
        throw new BadRequestException(
          'Cannot cancel a confirmed booking without a payment record',
        );
      }
      return this.paymentsService.refundAndCancel(id, reason);
    }

    if (booking.status === BookingStatus.Cancelled) {
      if (isAdmin && hasRefundablePayment) {
        return this.paymentsService.refundAndCancel(id, reason);
      }
      throw new BadRequestException(
        `Cannot cancel a booking with status ${booking.status}`,
      );
    }

    if (booking.status === BookingStatus.Pending) {
      if (hasRefundablePayment) {
        return this.paymentsService.refundAndCancel(id, reason);
      }

      booking.status = BookingStatus.Cancelled;
      await this.bookings.save(booking);

      const cancelledBooking = await this.findBookingWithEmailRelations(id);
      if (cancelledBooking) {
        await this.lifecycle.onBookingCancelled(cancelledBooking, reason);
      }

      return booking;
    }

    throw new BadRequestException(
      `Cannot cancel a booking with status ${booking.status}`,
    );
  }

  async findBookingRaw(id: string): Promise<Booking | null> {
    const booking = await this.bookings.findOne({ where: { id } });
    return booking;
  }

  async setStripeSessionId(
    bookingId: string,
    sessionId: string,
  ): Promise<void> {
    await this.bookings.update(
      { id: bookingId },
      { stripeSessionId: sessionId },
    );
  }

  async findBookingWithEmailRelations(
    id: string,
  ): Promise<BookingWithEmailRelations | null> {
    return this.bookings.findOne({
      where: { id },
      relations: ['user', 'slot'],
    });
  }
}
