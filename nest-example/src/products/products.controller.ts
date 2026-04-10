import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Patch,
} from '@nestjs/common';
import type { Product } from './product.model';
import { ProductsService } from './products.service';
import { randomUUID } from 'crypto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('searchTerm') searchTerm: string): Product[] {
    return this.productsService.getProducts(searchTerm);
  }

  @Get(':id')
  getProductDetails(@Param('id') id: string): Product {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(
    @Body() body: Pick<Product, 'name' | 'description' | 'price'>,
  ): Product {
    return this.productsService.createProduct({
      id: randomUUID(),
      name: body.name,
      description: body.description,
      price: body.price,
    });
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() product: Product): Product {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): void {
    this.productsService.deleteProduct(id);
  }
}
