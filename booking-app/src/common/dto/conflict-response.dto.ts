import { ApiProperty } from '@nestjs/swagger';

export class ConflictResponseDto {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 'Slot already has an active booking' })
  message: string | string[];

  @ApiProperty({ example: '/api/current_endpoint' })
  path: string;

  @ApiProperty({ example: '2024-06-17T00:00:00.000Z' })
  timestamp: string;
}
