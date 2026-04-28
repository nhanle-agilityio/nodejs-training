import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Product } from '../product.entity';
import { CreateProductDto } from './create-product-v1.dto';
import { UpdateProductDto } from './update-product-v1.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsV1Service {
  private readonly logger = new Logger(ProductsV1Service.name);
  private async invalidateProductsCache(): Promise<void> {
    await this.cache.clear();
    this.logger.debug('Cache cleared after products mutation');
  }

  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async getProducts(searchTerm: string): Promise<Product[]> {
    if (searchTerm) {
      return this.productsRepo.find({
        where: { name: ILike(`%${searchTerm}%`) },
      });
    }
    return this.productsRepo.find();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = this.productsRepo.create({
      name: dto.name,
      price: dto.price,
      description: dto.description,
    });
    const saved = await this.productsRepo.save(product);
    await this.invalidateProductsCache();
    return saved;
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, dto);
    const saved = await this.productsRepo.save(product);
    await this.invalidateProductsCache();
    return saved;
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.invalidateProductsCache();
  }
}
