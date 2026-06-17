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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../common/dto/error-response.dto';
import { plainToInstance } from 'class-transformer';
import { CheckPolicies } from '../casl/policies.decorator';
import { Action } from '../casl/casl.types';
import { Booking } from './booking.entity';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingResponseDto } from './dto/booking-response.dto';
import { BookingsQueryDto } from './dto/bookings-query.dto';
import { MyBookingsQueryDto } from './dto/my-bookings-query.dto';
import { PaginatedBookingsResponseDto } from './dto/paginated-bookings-response.dto';
import { mapPaginatedItems } from '../common/pagination/map-paginated-items';
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
  @ApiOperation({
    summary: 'Create a booking',
    description:
      'Books a slot for the authenticated user. Admins may supply a `userId` to book on behalf of another user. Returns 409 if the slot already has an active booking.',
  })
  @ApiCreatedResponse({
    description: 'Booking created successfully',
    type: BookingResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Slot not available or slot start time has already passed',
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description:
      'Non-admin user supplied a userId to book on behalf of another user',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Slot not found',
    type: ErrorResponseDto,
  })
  @ApiConflictResponse({
    description: 'Slot already has an active booking',
    type: ErrorResponseDto,
  })
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
  @ApiOperation({
    summary: 'List all bookings',
    description:
      'Admin only. Returns a paginated list of all bookings across all users. Supports filtering by status, slotId, and userId.',
  })
  @ApiOkResponse({
    description: 'Paginated list of all bookings',
    type: PaginatedBookingsResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Admin role required',
    type: ErrorResponseDto,
  })
  async getBookings(
    @Query() query: BookingsQueryDto,
  ): Promise<PaginatedBookingsResponseDto> {
    const result = await this.bookingsService.getAllBookings(query);

    return mapPaginatedItems(result, (b) =>
      plainToInstance(BookingResponseDto, b, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Get('me')
  @ApiOperation({
    summary: "List the current user's bookings",
    description:
      'Returns a paginated list of bookings belonging to the authenticated user. Supports filtering by status.',
  })
  @ApiOkResponse({
    description: "Paginated list of the user's own bookings",
    type: PaginatedBookingsResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: ErrorResponseDto,
  })
  async getMyBookings(
    @CurrentUser() user: User | undefined,
    @Query() query: MyBookingsQueryDto,
  ): Promise<PaginatedBookingsResponseDto> {
    if (!user) throw new UnauthorizedException();

    const result = await this.bookingsService.getBookingsByUser({
      userId: user.id,
      status: query.status,
      page: query.page,
      limit: query.limit,
    });

    return mapPaginatedItems(result, (b) =>
      plainToInstance(BookingResponseDto, b, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a booking by ID',
    description:
      'Returns a single booking. Users can only retrieve their own bookings; admins can retrieve any booking.',
  })
  @ApiParam({ name: 'id', description: 'Booking ID', format: 'uuid' })
  @ApiOkResponse({ description: 'Booking details', type: BookingResponseDto })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format',
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Booking not found or does not belong to the current user',
    type: ErrorResponseDto,
  })
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
  @ApiOperation({
    summary: 'Cancel a booking',
    description:
      'Cancels a booking. If the booking has a completed payment, a Stripe refund is initiated asynchronously; the booking status moves to `REFUND_PENDING` immediately and to `REFUNDED` once the `refund.updated` webhook is received. Users can only cancel their own bookings; admins can cancel any booking.',
  })
  @ApiParam({ name: 'id', description: 'Booking ID', format: 'uuid' })
  @ApiOkResponse({
    description: 'Booking cancelled (status is CANCELLED or REFUND_PENDING)',
    type: BookingResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Booking cannot be cancelled — wrong status, refund already in progress, or Stripe error',
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Booking not found or does not belong to the current user',
    type: ErrorResponseDto,
  })
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
