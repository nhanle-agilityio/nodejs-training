import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BookingStatus } from '../booking.entity';

export class BookingResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  userId: string;

  @Expose()
  @ApiProperty({ format: 'uuid' })
  slotId: string;

  @Expose()
  @ApiProperty({ enum: BookingStatus })
  status: BookingStatus;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
