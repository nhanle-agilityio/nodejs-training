import { ApiProperty } from '@nestjs/swagger';

export class ForbiddenResponseDto {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'Forbidden' })
  error: string;

  @ApiProperty({ example: 'You do not have permission to perform this action' })
  message: string | string[];

  @ApiProperty({ example: '/api/current_endpoint' })
  path: string;

  @ApiProperty({ example: '2024-06-17T00:00:00.000Z' })
  timestamp: string;
}
