import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductV2Dto {
  @ApiProperty({ example: 'Product Name', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10, minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 'Product Description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'USD', enum: ['USD', 'VND', 'EUR'] })
  @IsString()
  @IsIn(['USD', 'VND', 'EUR'])
  currency: string;
}
