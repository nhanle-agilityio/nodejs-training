import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<
    Pick<
      UsersService,
      'getUsers' | 'getUserById' | 'createUser' | 'updateUser' | 'deleteUser'
    >
  >;

  const mockUserId = '6a425c1f-954b-4c1d-b5bc-a6ba9205bd66';

  const buildMockUser = (): User => {
    const now = new Date('2026-01-01T00:00:00.000Z');
    return {
      id: mockUserId,
      clerkId: null,
      username: 'john_doe',
      email: 'john@example.com',
      password: null,
      createdAt: now,
      updatedAt: now,
    } as User;
  };

  const buildCreateDto = (): CreateUserDto => ({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'strong-password-123',
  });

  beforeEach(async () => {
    service = {
      getUsers: jest.fn(),
      getUserById: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: service },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            clear: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should delegate to service.getUsers and return its result', async () => {
      const mockUser = buildMockUser();
      service.getUsers.mockResolvedValue([mockUser]);

      await expect(controller.getUsers(undefined)).resolves.toEqual([mockUser]);

      expect(service.getUsers).toHaveBeenCalledWith();
      expect(service.getUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserDetails', () => {
    it('should delegate to service.getUserById and return the user', async () => {
      const mockUser = buildMockUser();
      service.getUserById.mockResolvedValue(mockUser);

      await expect(controller.getUserDetails(mockUserId)).resolves.toEqual(
        mockUser,
      );

      expect(service.getUserById).toHaveBeenCalledWith(mockUserId);
      expect(service.getUserById).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    it('should delegate to service.createUser with the dto', async () => {
      const createUserDto = buildCreateDto();
      const createdUser = buildMockUser();
      service.createUser.mockResolvedValue(createdUser);

      await expect(controller.createUser(createUserDto)).resolves.toEqual(
        createdUser,
      );

      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
      expect(service.createUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should delegate to service.updateUser with id and dto', async () => {
      const updateUserDto: UpdateUserDto = { username: 'jane_doe' };
      const updatedUser = { ...buildMockUser(), username: 'jane_doe' };
      service.updateUser.mockResolvedValue(updatedUser);

      await expect(
        controller.updateUser(mockUserId, updateUserDto),
      ).resolves.toEqual(updatedUser);

      expect(service.updateUser).toHaveBeenCalledWith(
        mockUserId,
        updateUserDto,
      );
      expect(service.updateUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', () => {
    it('should delegate to service.deleteUser with the id and resolve void', async () => {
      service.deleteUser.mockResolvedValue(undefined);

      await expect(controller.deleteUser(mockUserId)).resolves.toBeUndefined();

      expect(service.deleteUser).toHaveBeenCalledWith(mockUserId);
      expect(service.deleteUser).toHaveBeenCalledTimes(1);
    });
  });
});
