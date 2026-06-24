import { CreateSlotDto } from './create-slot.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SlotStatus } from '../slot.entity';

export class UpdateSlotDto extends PartialType(CreateSlotDto) {
  @ApiPropertyOptional({ enum: SlotStatus })
  @IsOptional()
  @IsEnum(SlotStatus)
  status?: SlotStatus;
}
