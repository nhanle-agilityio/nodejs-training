import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: ['Invalid format'] })
  message: string | string[];

  @ApiProperty({ example: '/api/current_endpoint' })
  path: string;

  @ApiProperty({ example: '2024-06-17T00:00:00.000Z' })
  timestamp: string;
}
