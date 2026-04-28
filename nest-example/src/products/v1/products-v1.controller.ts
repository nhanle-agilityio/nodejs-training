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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Product } from '../product.entity';
import { ProductsV1Service } from './products-v1.service';
import { CreateProductDto } from './create-product-v1.dto';
import { UpdateProductDto } from './update-product-v1.dto';
import { CorrelationId } from 'src/common/decorators/correlation-id.decorator';
import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller({ path: 'products', version: '1' })
@ApiTags('products v1')
@UseInterceptors(CacheInterceptor)
export class ProductsV1Controller {
  constructor(private readonly productsService: ProductsV1Service) {}

  @Public()
  @Get()
  @CacheTTL(30_000)
  @ApiOperation({ summary: 'Get all products (cached ~30s)' })
  @ApiQuery({
    name: 'searchTerm',
    required: false,
    description: 'Filter products by name',
  })
  @ApiResponse({ status: 200, description: 'List returned', type: [Product] })
  getProducts(
    @Query('searchTerm') searchTerm?: string,
    @CorrelationId() correlationId?: string,
  ): Promise<Product[]> {
    console.log('correlationId', correlationId);
    return this.productsService.getProducts(searchTerm ?? '');
  }

  @Get(':id')
  @CacheTTL(120_000) // 2 minutes — single item rarely changes
  @ApiOperation({ summary: 'Get one product (cached ~2m)' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 200, description: 'Product returned', type: Product })
  getProductDetails(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create product (invalidates list cache)' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 201, description: 'Product created', type: Product })
  createProduct(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update product (invalidates list + item cache)' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete product (invalidates list + item cache)' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 200, description: 'Product deleted' })
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
