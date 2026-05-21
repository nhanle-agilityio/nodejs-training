import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CheckoutSessionResponseDto {
  @Expose()
  @ApiProperty()
  checkoutUrl: string;

  @Expose()
  @ApiProperty()
  sessionId: string;

  @Expose()
  @ApiPropertyOptional()
  expiresAt?: Date;
}
