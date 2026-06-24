import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ format: 'uuid', description: 'ID of the slot to book' })
  @IsUUID()
  slotId: string;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'Target user ID — admin only, ignored for regular users',
  })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
