import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 'Booking not found' })
  message: string | string[];

  @ApiProperty({ example: '/api/bookings/123' })
  path: string;

  @ApiProperty()
  timestamp: string;
}
