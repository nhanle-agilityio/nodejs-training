import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { randomUUID } from 'crypto';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    { id: '1', name: 'book', description: 'Description 1', price: 100 },
    { id: '2', name: 'pen', description: 'Description 2', price: 200 },
    { id: '3', name: 'pencil', description: 'Description 3', price: 300 },
  ];

  getProducts(searchTerm: string): Product[] {
    if (searchTerm) {
      return this.products.filter((p: Product) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    return this.products;
  }

  getProductById(id: string): Product {
    const product = this.products.find((p: Product) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  createProduct(dto: CreateProductDto): Product {
    const product: Product = {
      id: randomUUID(),
      name: dto.name,
      description: dto.description ?? '',
      price: dto.price,
    };
    this.products.push(product);
    return product;
  }

  updateProduct(id: string, dto: UpdateProductDto): Product {
    const index = this.products.findIndex((p: Product) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = { ...this.products[index], ...dto };
    return this.products[index];
  }

  deleteProduct(id: string): void {
    const index = this.products.findIndex((p: Product) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
}
