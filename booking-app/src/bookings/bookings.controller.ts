import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CheckPolicies } from '../casl/policies.decorator';
import { Action } from '../casl/casl.types';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { BookingsQueryDto } from './dto/bookings-query.dto';
import { PaginatedBookingsResponseDto } from './dto/paginated-bookings-response.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@ApiTags('bookings')
@ApiBearerAuth('clerk-jwt')
@Controller('bookings')
export class BookingsController {
  private readonly logger = new Logger(BookingsController.name);

  constructor(
    private readonly bookingsService: BookingsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @CheckPolicies((ability) => ability.can(Action.Create, Booking))
  @ApiCreatedResponse({ type: BookingResponseDto })
  async createBooking(
    @CurrentUser() user: User | undefined,
    @Body() dto: CreateBookingDto,
  ): Promise<BookingResponseDto> {
    if (!user) throw new UnauthorizedException();

    const isAdmin = user.role === UserRole.Admin;
    let targetUserId = user.id;

    if (dto.userId) {
      if (!isAdmin) {
        throw new ForbiddenException(
          'Only admins can book on behalf of another user',
        );
      }

      const target = await this.usersService.findById(dto.userId);

      if (!target) throw new ForbiddenException('Target user not found');

      targetUserId = target.id;
      this.logger.log(
        `Admin ${user.id} creating booking on behalf of user ${targetUserId}`,
      );
    }

    const booking = await this.bookingsService.createBooking(
      targetUserId,
      dto.slotId,
    );
    return plainToInstance(BookingResponseDto, booking, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @CheckPolicies((ability) => ability.can(Action.Manage, Booking))
  @ApiOkResponse({ type: PaginatedBookingsResponseDto })
  async findAll(
    @Query() query: BookingsQueryDto,
  ): Promise<PaginatedBookingsResponseDto> {
    const { items, total } = await this.bookingsService.getAllBookings({
      status: query.status,
      userId: query.userId,
      slotId: query.slotId,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    });

    return {
      items: items.map((b) =>
        plainToInstance(BookingResponseDto, b, {
          excludeExtraneousValues: true,
        }),
      ),
      total,
      page: query.page ?? 1,
      limit: query.limit ?? 20,
    };
  }

  @Get('me')
  @ApiOkResponse({ type: [BookingResponseDto] })
  async findMyBookings(
    @CurrentUser() user: User | undefined,
  ): Promise<BookingResponseDto[]> {
    if (!user) throw new UnauthorizedException();

    const bookings = await this.bookingsService.getBookingsByUser(user.id);

    return bookings.map((b) =>
      plainToInstance(BookingResponseDto, b, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: BookingResponseDto })
  async getBookingById(
    @CurrentUser() user: User | undefined,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BookingResponseDto> {
    if (!user) throw new UnauthorizedException();

    const booking = await this.bookingsService.getBookingById(id);

    if (user.role !== UserRole.Admin && booking.userId !== user.id) {
      throw new NotFoundException('Booking not found');
    }

    return plainToInstance(BookingResponseDto, booking, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id/cancel')
  @ApiOkResponse({ type: BookingResponseDto })
  async cancelBooking(
    @CurrentUser() user: User | undefined,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BookingResponseDto> {
    if (!user) throw new UnauthorizedException();

    const isAdmin = user.role === UserRole.Admin;

    if (isAdmin) {
      this.logger.log(`Admin ${user.id} cancelling booking ${id}`);
    }

    const booking = await this.bookingsService.cancelBooking(
      id,
      user.id,
      isAdmin,
    );

    return plainToInstance(BookingResponseDto, booking, {
      excludeExtraneousValues: true,
    });
  }
}
