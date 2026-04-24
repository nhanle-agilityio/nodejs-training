import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ProductsV2Service } from './products-v2.service';
import { CreateProductV2Dto } from './create-product-v2.dto';
import { Product } from '../product.entity';
import { UpdateProductV2Dto } from './update-product-v2.dto';

@Controller({ path: 'products', version: '2' })
@ApiTags('products-v2')
@ApiBearerAuth('clerk-jwt')
export class ProductsV2Controller {
  constructor(private readonly svc: ProductsV2Service) {}

  @Public()
  @Get()
  @ApiOperation({ summary: '[v2] Get all products (with currency)' })
  getProducts(@Query('searchTerm') searchTerm?: string) {
    return this.svc.getProducts(searchTerm ?? '');
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '[v2] Create product (currency required)' })
  @ApiResponse({ status: 201, description: 'Product created', type: Product })
  createProduct(@Body() dto: CreateProductV2Dto): Promise<Product> {
    return this.svc.createProduct(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '[v2] Get one product (with currency)' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 200, description: 'Product returned', type: Product })
  getProductDetails(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.svc.getProductById(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '[v2] Update product (currency required)' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 200, description: 'Product updated', type: Product })
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductV2Dto,
  ): Promise<Product> {
    return this.svc.updateProduct(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: '[v2] Delete product' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 200, description: 'Product deleted' })
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.svc.deleteProduct(id);
  }
}
