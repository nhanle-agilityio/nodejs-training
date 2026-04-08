import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import type { Product } from './product.model';
import { ProductsService } from './products.service';
import { randomUUID } from 'crypto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(): Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Product {
    return this.productsService.findOne(id);
  }

  @Post()
  create(
    @Body() body: Pick<Product, 'name' | 'description' | 'price'>,
  ): Product {
    return this.productsService.create({
      id: randomUUID(),
      name: body.name,
      description: body.description,
      price: body.price,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() product: Product): Product {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.productsService.delete(id);
  }
}
