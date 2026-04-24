import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { ProductsV2Controller } from './products-v2.controller';
import { ProductsV2Service } from './products-v2.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsV2Controller],
  providers: [ProductsV2Service],
})
export class ProductsV2Module {}
