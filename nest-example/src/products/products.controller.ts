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
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

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
  createProduct(@Body() dto: CreateProductDto): Product {
    return this.productsService.createProduct(dto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Product {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): void {
    this.productsService.deleteProduct(id);
  }
}
