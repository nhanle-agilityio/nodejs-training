import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponseDto {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 'Missing or invalid token' })
  message: string | string[];

  @ApiProperty({ example: '/api/current_endpoint' })
  path: string;

  @ApiProperty({ example: '2024-06-17T00:00:00.000Z' })
  timestamp: string;
}
