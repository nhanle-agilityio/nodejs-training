import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';
import { BookingResponseDto } from './booking-response.dto';

export class PaginatedBookingsResponseDto extends PaginatedResponseDto {
  @ApiProperty({ type: [BookingResponseDto] })
  items: BookingResponseDto[];
}
