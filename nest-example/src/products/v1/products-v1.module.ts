import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { ProductsV1Controller } from './products-v1.controller';
import { ProductsV1Service } from './products-v1.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsV1Controller],
  providers: [ProductsV1Service],
})
export class ProductsV1Module {}
