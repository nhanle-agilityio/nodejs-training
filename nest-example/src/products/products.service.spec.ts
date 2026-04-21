import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: jest.Mocked<
    Pick<Repository<Product>, 'find' | 'findOne' | 'create' | 'save' | 'delete'>
  >;

  const now = new Date();
  const mockProductID = '6a425c1f-954b-4c1d-b5bc-a6ba9205bd66';
  const mockProduct = {
    id: mockProductID,
    name: 'Product 1',
    price: 1,
    description: 'Description for Product 1',
    createdAt: now,
    updatedAt: now,
  } as Product;
  const mockNewProduct = {
    name: 'Product 1',
    price: 1,
    description: 'Description for Product 1',
  } as CreateProductDto;

  beforeEach(async () => {
    repo = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: repo },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getProducts returns list', async () => {
    repo.find.mockResolvedValue([mockProduct]);
    await expect(service.getProducts('')).resolves.toEqual([mockProduct]);
    expect(repo.find).toHaveBeenCalled();
  });

  it('getProducts with search term returns list', async () => {
    repo.find.mockResolvedValue([mockProduct]);
    await expect(service.getProducts(mockProduct.name)).resolves.toEqual([
      mockProduct,
    ]);
    expect(repo.find).toHaveBeenCalledWith({
      where: { name: ILike(`%${mockProduct.name}%`) },
    });
  });

  it('getProductById returns product', async () => {
    repo.findOne.mockResolvedValue(mockProduct);
    await expect(service.getProductById(mockProductID)).resolves.toEqual(
      mockProduct,
    );
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: mockProductID } });
  });

  it('getProductById throws when not found', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.getProductById(mockProductID)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: mockProductID } });
  });

  it('createProduct returns product', async () => {
    repo.save.mockResolvedValue(mockProduct);
    await expect(service.createProduct(mockNewProduct)).resolves.toEqual(
      mockProduct,
    );
    expect(repo.create).toHaveBeenCalledWith(mockNewProduct);
  });

  it('updateProduct returns product', async () => {
    repo.save.mockResolvedValue(mockProduct);
    repo.findOne.mockResolvedValue(mockProduct);
    await expect(
      service.updateProduct(mockProductID, mockNewProduct),
    ).resolves.toEqual(mockProduct);
    expect(repo.save).toHaveBeenCalledWith(mockProduct);
  });

  it('updateProduct throws when not found', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(
      service.updateProduct(mockProductID, mockNewProduct),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: mockProductID } });
  });

  it('deleteProduct throws when not found', async () => {
    repo.delete.mockResolvedValue({ affected: 0 } as DeleteResult);
    await expect(service.deleteProduct(mockProductID)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(repo.delete).toHaveBeenCalledWith(mockProductID);
  });

  it('deleteProduct returns void', async () => {
    repo.delete.mockResolvedValue({ affected: 1 } as DeleteResult);
    await expect(service.deleteProduct(mockProductID)).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith(mockProductID);
  });
});
