import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product-v1.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
