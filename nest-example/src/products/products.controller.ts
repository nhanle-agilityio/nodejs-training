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
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
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

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all products' })
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
  @ApiOperation({ summary: 'Get one product' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 200, description: 'Product returned', type: Product })
  getProductDetails(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    return this.productsService.getProductById(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create product' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 201, description: 'Product created', type: Product })
  createProduct(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update product' })
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
  @ApiOperation({ summary: 'Delete product' })
  @ApiBearerAuth('clerk-jwt')
  @ApiResponse({ status: 200, description: 'Product deleted' })
  deleteProduct(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}
