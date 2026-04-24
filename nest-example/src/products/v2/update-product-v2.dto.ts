import { PartialType } from '@nestjs/swagger';
import { CreateProductV2Dto } from './create-product-v2.dto';

export class UpdateProductV2Dto extends PartialType(CreateProductV2Dto) {}
