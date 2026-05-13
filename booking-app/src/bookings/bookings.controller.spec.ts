import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/user.entity';
import { Booking, BookingStatus } from './booking.entity';

describe('BookingsController', () => {
  let controller: BookingsController;
  let bookingsService: jest.Mocked<
    Pick<BookingsService, keyof BookingsService>
  >;
  let usersService: jest.Mocked<Pick<UsersService, 'findById'>>;

  const user = {
    id: 'u1111111-1111-1111-1111-111111111111',
    role: UserRole.User,
  } as User;

  const admin = {
    id: 'a1111111-1111-1111-1111-111111111111',
    role: UserRole.Admin,
  } as User;

  const targetUser = {
    id: 't1111111-1111-1111-1111-111111111111',
    role: UserRole.User,
  } as User;

  const bookingId = 'b1111111-1111-1111-1111-111111111111';
  const slotId = 's1111111-1111-1111-1111-111111111111';

  const pendingBooking = {
    id: bookingId,
    userId: user.id,
    slotId,
    status: BookingStatus.Pending,
  } as Booking;

  beforeEach(async () => {
    bookingsService = {
      createBooking: jest.fn(),
      getAllBookings: jest.fn(),
      getBookingsByUser: jest.fn(),
      getBookingById: jest.fn(),
      cancelBooking: jest.fn(),
    };

    usersService = {
      findById: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [
        { provide: BookingsService, useValue: bookingsService },
        { provide: UsersService, useValue: usersService },
      ],
    }).compile();

    controller = moduleRef.get(BookingsController);
  });

  describe('createBooking', () => {
    it('throws when user is missing', async () => {
      await expect(
        controller.createBooking(undefined, { slotId }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws when non-admin supplies userId', async () => {
      await expect(
        controller.createBooking(user, { slotId, userId: targetUser.id }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('throws when admin target user is missing', async () => {
      usersService.findById.mockResolvedValue(null);

      await expect(
        controller.createBooking(admin, { slotId, userId: targetUser.id }),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('calls service with caller id for normal user', async () => {
      bookingsService.createBooking.mockResolvedValue(pendingBooking);

      await controller.createBooking(user, { slotId });

      expect(bookingsService.createBooking).toHaveBeenCalledWith(
        user.id,
        slotId,
      );
    });

    it('calls service with resolved target id for admin', async () => {
      usersService.findById.mockResolvedValue(targetUser);
      bookingsService.createBooking.mockResolvedValue({
        ...pendingBooking,
        userId: targetUser.id,
      });

      await controller.createBooking(admin, { slotId, userId: targetUser.id });

      expect(usersService.findById).toHaveBeenCalledWith(targetUser.id);
      expect(bookingsService.createBooking).toHaveBeenCalledWith(
        targetUser.id,
        slotId,
      );
    });
  });

  describe('findAll', () => {
    it('passes query through to service with defaults', async () => {
      bookingsService.getAllBookings.mockResolvedValue({
        items: [pendingBooking],
        total: 1,
      });

      const result = await controller.findAll({
        status: BookingStatus.Pending,
        userId: user.id,
        slotId,
        page: 2,
        limit: 5,
      });

      expect(bookingsService.getAllBookings).toHaveBeenCalledWith({
        status: BookingStatus.Pending,
        userId: user.id,
        slotId,
        page: 2,
        limit: 5,
      });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(5);
    });

    it('defaults page and limit', async () => {
      bookingsService.getAllBookings.mockResolvedValue({ items: [], total: 0 });

      const result = await controller.findAll({});

      expect(bookingsService.getAllBookings).toHaveBeenCalledWith({
        status: undefined,
        userId: undefined,
        slotId: undefined,
        page: 1,
        limit: 20,
      });
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
    });
  });

  describe('findMyBookings', () => {
    it('throws when user missing', async () => {
      await expect(controller.findMyBookings(undefined)).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it('returns mapped bookings', async () => {
      bookingsService.getBookingsByUser.mockResolvedValue([pendingBooking]);

      const dto = await controller.findMyBookings(user);

      expect(bookingsService.getBookingsByUser).toHaveBeenCalledWith(user.id);
      expect(dto).toHaveLength(1);
      expect(dto[0]).toMatchObject({ id: bookingId });
    });
  });

  describe('getBookingById', () => {
    it('throws when user missing', async () => {
      await expect(
        controller.getBookingById(undefined, bookingId),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('hides booking from non-owner non-admin', async () => {
      bookingsService.getBookingById.mockResolvedValue({
        ...pendingBooking,
        userId: targetUser.id,
      });

      await expect(
        controller.getBookingById(user, bookingId),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns booking for owner', async () => {
      bookingsService.getBookingById.mockResolvedValue(pendingBooking);

      const dto = await controller.getBookingById(user, bookingId);

      expect(dto).toMatchObject({ id: bookingId, userId: user.id });
    });

    it('returns booking for admin even if not owner', async () => {
      bookingsService.getBookingById.mockResolvedValue({
        ...pendingBooking,
        userId: targetUser.id,
      });

      const dto = await controller.getBookingById(admin, bookingId);

      expect(dto.userId).toBe(targetUser.id);
    });
  });

  describe('cancelBooking', () => {
    it('throws when user missing', async () => {
      await expect(
        controller.cancelBooking(undefined, bookingId),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('passes admin flag to service for admins', async () => {
      bookingsService.cancelBooking.mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Cancelled,
      });

      await controller.cancelBooking(admin, bookingId);

      expect(bookingsService.cancelBooking).toHaveBeenCalledWith(
        bookingId,
        admin.id,
        true,
      );
    });

    it('passes admin flag false for users', async () => {
      bookingsService.cancelBooking.mockResolvedValue({
        ...pendingBooking,
        status: BookingStatus.Cancelled,
      });

      await controller.cancelBooking(user, bookingId);

      expect(bookingsService.cancelBooking).toHaveBeenCalledWith(
        bookingId,
        user.id,
        false,
      );
    });
  });
});
