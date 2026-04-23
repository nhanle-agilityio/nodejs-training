import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpsertUserDto {
  @ApiProperty({ example: 'user_2abcXYZ' })
  @IsString()
  @IsNotEmpty()
  clerkId: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  username: string;
}
