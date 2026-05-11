import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { SlotStatus } from '../slot.entity';

export class SlotResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  startTime: Date;

  @Expose()
  @ApiProperty()
  endTime: Date;

  @Expose()
  @ApiProperty({ example: '50.00' })
  price: number;

  @Expose()
  @ApiProperty({ enum: SlotStatus })
  status: SlotStatus;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;
}
