import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: 'Not Found' })
  error: string;

  @ApiProperty({ example: 'Resource not found' })
  message: string | string[];

  @ApiProperty({ example: '/api/current_endpoint/id' })
  path: string;

  @ApiProperty({ example: '2024-06-17T00:00:00.000Z' })
  timestamp: string;
}
