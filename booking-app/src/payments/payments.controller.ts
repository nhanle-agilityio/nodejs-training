import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
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
  @ApiCreatedResponse({ type: CheckoutSessionResponseDto })
  async createCheckoutSession(
    @CurrentUser() user: User,
    @Param('bookingId', ParseUUIDPipe) bookingId: string,
  ): Promise<CheckoutSessionResponseDto> {
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
