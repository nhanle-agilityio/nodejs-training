import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../product.entity';
import { CreateProductV2Dto } from './create-product-v2.dto';
import { UpdateProductV2Dto } from './update-product-v2.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsV2Service {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
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

  async createProduct(dto: CreateProductV2Dto): Promise<Product> {
    const product = this.productsRepo.create({
      name: dto.name,
      price: dto.price,
      description: dto.description,
    });
    return this.productsRepo.save(product);
  }

  async updateProduct(id: string, dto: UpdateProductV2Dto): Promise<Product> {
    const product = await this.productsRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    Object.assign(product, dto);
    return this.productsRepo.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productsRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
