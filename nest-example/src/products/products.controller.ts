import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { CorrelationId } from 'src/common/decorators/correlation-id.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('searchTerm') searchTerm: string,
    @CorrelationId() correlationId: string | undefined,
  ): Promise<Product[]> {
    console.log('correlationId', correlationId);
    return this.productsService.getProducts(searchTerm);
  }

  @Get(':id')
  getProductDetails(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(dto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
