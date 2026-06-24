import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { BadRequestResponseDto } from '../common/dto/bad-request-response.dto';
import { UnauthorizedResponseDto } from '../common/dto/unauthorized-response.dto';
import { NotFoundResponseDto } from '../common/dto/not-found-response.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User, UserRole } from '../users/user.entity';
import { CheckoutSessionResponseDto } from './dto/checkout-session-response.dto';
import { PaymentsService } from './payments.service';

@ApiTags('payments')
@ApiBearerAuth('clerk-jwt')
@Controller('bookings')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post(':bookingId/checkout')
  @ApiOperation({
    summary: 'Create a Stripe checkout session for a booking',
    description:
      'Initiates payment for a pending booking by creating a Stripe Checkout Session. Returns a `checkoutUrl` that the client should redirect the user to. The booking must be in `PENDING` status and within the payment window. Admins can initiate checkout for any booking.',
  })
  @ApiParam({ name: 'bookingId', description: 'Booking ID', format: 'uuid' })
  @ApiCreatedResponse({
    description:
      'Checkout session created — redirect the user to `checkoutUrl`',
    type: CheckoutSessionResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'Booking is not in PENDING status, payment window has expired, or slot is no longer available',
    type: BadRequestResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: UnauthorizedResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Booking not found or does not belong to the current user',
    type: NotFoundResponseDto,
  })
  async createCheckoutSession(
    @CurrentUser() user: User | undefined,
    @Param('bookingId', ParseUUIDPipe) bookingId: string,
  ): Promise<CheckoutSessionResponseDto> {
    if (!user) throw new UnauthorizedException();

    const isAdmin = user.role === UserRole.Admin;
    const session = await this.paymentsService.createCheckoutSession(
      bookingId,
      user.id,
      isAdmin,
    );

    return plainToInstance(CheckoutSessionResponseDto, session, {
      excludeExtraneousValues: true,
    });
  }
}
