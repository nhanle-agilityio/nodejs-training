import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';
import { SlotResponseDto } from './slot-response.dto';

export class PaginatedSlotsResponseDto extends PaginatedResponseDto {
  @ApiProperty({ type: [SlotResponseDto] })
  items: SlotResponseDto[];
}
