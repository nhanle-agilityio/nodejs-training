import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: jest.Mocked<
    Pick<Repository<Product>, 'find' | 'findOne' | 'create' | 'save' | 'delete'>
  >;
  const mockProductID = '6a425c1f-954b-4c1d-b5bc-a6ba9205bd66';

  const buildMockProduct = (): Product => {
    const now = new Date('2026-01-01T00:00:00.000Z');
    return {
      id: mockProductID,
      name: 'Product 1',
      price: 1,
      description: 'Description for Product 1',
      createdAt: now,
      updatedAt: now,
    } as Product;
  };

  const buildCreateDto = (): CreateProductDto => ({
    name: 'Product 1',
    price: 1,
    description: 'Description for Product 1',
  });

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

  describe('getProducts', () => {
    it('should return all products when no search term is provided', async () => {
      const mockProduct = buildMockProduct();
      repo.find.mockResolvedValue([mockProduct]);

      await expect(service.getProducts('')).resolves.toEqual([mockProduct]);

      expect(repo.find).toHaveBeenCalledWith();
      expect(repo.find).toHaveBeenCalledTimes(1);
    });

    it('should filter by ILike when a search term is provided', async () => {
      const mockProduct = buildMockProduct();
      repo.find.mockResolvedValue([mockProduct]);

      await expect(service.getProducts(mockProduct.name)).resolves.toEqual([
        mockProduct,
      ]);

      expect(repo.find).toHaveBeenCalledWith({
        where: { name: ILike(`%${mockProduct.name}%`) },
      });
    });
  });

  describe('getProductById', () => {
    it('should return the product when found', async () => {
      const mockProduct = buildMockProduct();
      repo.findOne.mockResolvedValue(mockProduct);

      await expect(service.getProductById(mockProductID)).resolves.toEqual(
        mockProduct,
      );

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: mockProductID },
      });
    });

    it('should throw NotFoundException when product does not exist', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(
        service.getProductById(mockProductID),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: mockProductID },
      });
    });
  });

  describe('createProduct', () => {
    it('should create the entity and persist it via save', async () => {
      const dto = buildCreateDto();
      const createdEntity = { ...dto } as Product;
      const savedEntity = buildMockProduct();

      repo.create.mockReturnValue(createdEntity);
      repo.save.mockResolvedValue(savedEntity);

      await expect(service.createProduct(dto)).resolves.toEqual(savedEntity);

      expect(repo.create).toHaveBeenCalledWith({
        name: dto.name,
        price: dto.price,
        description: dto.description,
      });
      expect(repo.save).toHaveBeenCalledWith(createdEntity);
    });
  });

  describe('updateProduct', () => {
    it('should merge the dto into the existing entity and save it', async () => {
      const existing = buildMockProduct();
      const updateProductDto: UpdateProductDto = {
        name: 'Updated name',
        price: 42,
        description: 'Updated description',
      };
      const merged = { ...existing, ...updateProductDto };

      repo.findOne.mockResolvedValue(existing);
      repo.save.mockImplementation((entity) =>
        Promise.resolve(entity as Product),
      );

      await expect(
        service.updateProduct(mockProductID, updateProductDto),
      ).resolves.toEqual(merged);

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: mockProductID },
      });
      expect(repo.save).toHaveBeenCalledWith(expect.objectContaining(merged));
      expect(repo.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: mockProductID }),
      );
    });

    it('should support partial updates without clearing untouched fields', async () => {
      const existingProduct = buildMockProduct();
      const updateProductDto: UpdateProductDto = { price: 999 };

      repo.findOne.mockResolvedValue(existingProduct);
      repo.save.mockImplementation((entity) =>
        Promise.resolve(entity as Product),
      );

      const result = await service.updateProduct(
        mockProductID,
        updateProductDto,
      );

      expect(result).toMatchObject({
        id: mockProductID,
        name: existingProduct.name,
        description: existingProduct.description,
        price: 999,
      });
    });

    it('should throw NotFoundException when product does not exist', async () => {
      const updateProductDto: UpdateProductDto = { price: 999 };
      repo.findOne.mockResolvedValue(null);

      await expect(
        service.updateProduct(mockProductID, updateProductDto),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: mockProductID },
      });
      expect(repo.save).not.toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    it('should resolve with no value when a row was deleted', async () => {
      repo.delete.mockResolvedValue({ affected: 1, raw: [] } as DeleteResult);

      await expect(
        service.deleteProduct(mockProductID),
      ).resolves.toBeUndefined();

      expect(repo.delete).toHaveBeenCalledWith(mockProductID);
    });

    it('should throw NotFoundException when no row was affected', async () => {
      repo.delete.mockResolvedValue({ affected: 0, raw: [] } as DeleteResult);

      await expect(service.deleteProduct(mockProductID)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(repo.delete).toHaveBeenCalledWith(mockProductID);
    });
  });
});
