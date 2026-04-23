import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Product Name', maxLength: 200 })
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10, minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'Product Description' })
  @IsString()
  @IsOptional()
  description?: string;
}
