import { Test, TestingModule } from '@nestjs/testing';
import { ProductsV1Controller } from './products-v1.controller';
import { ProductsV1Service } from './products-v1.service';
import { Product } from '../product.entity';
import { CreateProductDto } from './create-product-v1.dto';
import { UpdateProductDto } from './update-product-v1.dto';

describe('ProductsController', () => {
  let controller: ProductsV1Controller;
  let service: jest.Mocked<
    Pick<
      ProductsV1Service,
      | 'getProducts'
      | 'getProductById'
      | 'createProduct'
      | 'updateProduct'
      | 'deleteProduct'
    >
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
    service = {
      getProducts: jest.fn(),
      getProductById: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsV1Controller],
      providers: [{ provide: ProductsV1Service, useValue: service }],
    }).compile();

    controller = module.get<ProductsV1Controller>(ProductsV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducts', () => {
    it('should delegate to service with the searchTerm and return its result', async () => {
      const mockProduct = buildMockProduct();
      const searchTerm = mockProduct.name;
      service.getProducts.mockResolvedValue([mockProduct]);

      await expect(
        controller.getProducts(searchTerm, undefined),
      ).resolves.toEqual([mockProduct]);

      expect(service.getProducts).toHaveBeenCalledWith(searchTerm);
      expect(service.getProducts).toHaveBeenCalledTimes(1);
    });

    it('should forward empty searchTerm unchanged', async () => {
      service.getProducts.mockResolvedValue([]);

      await expect(controller.getProducts('', undefined)).resolves.toEqual([]);

      expect(service.getProducts).toHaveBeenCalledWith('');
    });
  });

  describe('getProductDetails', () => {
    it('should delegate to service.getProductById and return the product', async () => {
      const mockProduct = buildMockProduct();
      service.getProductById.mockResolvedValue(mockProduct);

      await expect(
        controller.getProductDetails(mockProductID),
      ).resolves.toEqual(mockProduct);

      expect(service.getProductById).toHaveBeenCalledWith(mockProductID);
      expect(service.getProductById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createProduct', () => {
    it('should delegate to service.createProduct with the dto', async () => {
      const createProductDto = buildCreateDto();
      const createdProduct = buildMockProduct();
      service.createProduct.mockResolvedValue(createdProduct);

      await expect(controller.createProduct(createProductDto)).resolves.toEqual(
        createdProduct,
      );

      expect(service.createProduct).toHaveBeenCalledWith(createProductDto);
      expect(service.createProduct).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateProduct', () => {
    it('should delegate to service.updateProduct with id and dto', async () => {
      const updateProductDto: UpdateProductDto = { price: 42 };
      const updatedProduct = { ...buildMockProduct(), price: 42 };
      service.updateProduct.mockResolvedValue(updatedProduct);

      await expect(
        controller.updateProduct(mockProductID, updateProductDto),
      ).resolves.toEqual(updatedProduct);

      expect(service.updateProduct).toHaveBeenCalledWith(
        mockProductID,
        updateProductDto,
      );
      expect(service.updateProduct).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteProduct', () => {
    it('should delegate to service.deleteProduct with the id and resolve void', async () => {
      service.deleteProduct.mockResolvedValue(undefined);

      await expect(
        controller.deleteProduct(mockProductID),
      ).resolves.toBeUndefined();

      expect(service.deleteProduct).toHaveBeenCalledWith(mockProductID);
      expect(service.deleteProduct).toHaveBeenCalledTimes(1);
    });
  });
});
