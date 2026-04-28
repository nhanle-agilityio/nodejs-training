import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UpsertUserDto } from './upsert-user.dto';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<
    Pick<Repository<User>, 'find' | 'findOne' | 'save' | 'delete' | 'exist'>
  >;
  let cache: { clear: jest.Mock };

  const mockUserId = '6a425c1f-954b-4c1d-b5bc-a6ba9205bd66';

  const buildMockUser = (overrides: Partial<User> = {}): User => {
    const now = new Date('2026-01-01T00:00:00.000Z');
    return {
      id: mockUserId,
      clerkId: null,
      username: 'john_doe',
      email: 'john@example.com',
      password: 'hashed-password',
      createdAt: now,
      updatedAt: now,
      ...overrides,
    } as User;
  };

  const buildCreateDto = (): CreateUserDto => ({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'strong-password-123',
  });

  beforeEach(async () => {
    repo = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      exist: jest.fn(),
    };
    cache = { clear: jest.fn().mockResolvedValue(undefined) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repo },
        { provide: CACHE_MANAGER, useValue: cache },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    (bcrypt.hash as jest.Mock).mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const mockUser = buildMockUser();
      repo.find.mockResolvedValue([mockUser]);

      await expect(service.getUsers()).resolves.toEqual([mockUser]);

      expect(repo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    it('should return the user when found', async () => {
      const mockUser = buildMockUser();
      repo.findOne.mockResolvedValue(mockUser);

      await expect(service.getUserById(mockUserId)).resolves.toEqual(mockUser);

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: mockUserId },
      });
    });

    it('should throw NotFoundException when user does not exist', async () => {
      repo.findOne.mockResolvedValue(null);

      await expect(service.getUserById(mockUserId)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('should hash password, persist the user, and clear the cache', async () => {
      const dto = buildCreateDto();
      const savedUser = buildMockUser();

      repo.exist.mockResolvedValue(false);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      repo.save.mockResolvedValue(savedUser);

      await expect(service.createUser(dto)).resolves.toEqual(savedUser);

      expect(repo.exist).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(repo.save).toHaveBeenCalledWith({
        username: dto.username,
        email: dto.email,
        password: 'hashed-password',
      });
      expect(cache.clear).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException when email is already taken', async () => {
      const dto = buildCreateDto();
      repo.exist.mockResolvedValue(true);

      await expect(service.createUser(dto)).rejects.toBeInstanceOf(
        ConflictException,
      );

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(repo.save).not.toHaveBeenCalled();
      expect(cache.clear).not.toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should merge the dto into the existing user, save it, and clear cache', async () => {
      const existing = buildMockUser();
      const dto: UpdateUserDto = { username: 'jane_doe' };
      const merged = { ...existing, ...dto };

      repo.findOne.mockResolvedValue(existing);
      repo.save.mockImplementation((entity) => Promise.resolve(entity as User));

      await expect(service.updateUser(mockUserId, dto)).resolves.toEqual(
        merged,
      );

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { id: mockUserId },
      });
      expect(repo.save).toHaveBeenCalledWith(expect.objectContaining(merged));
      expect(cache.clear).toHaveBeenCalledTimes(1);
    });

    it('should check email uniqueness when email is being changed', async () => {
      const existing = buildMockUser();
      const dto: UpdateUserDto = { email: 'new@example.com' };

      repo.findOne.mockResolvedValue(existing);
      repo.exist.mockResolvedValue(false);
      repo.save.mockImplementation((entity) => Promise.resolve(entity as User));

      await service.updateUser(mockUserId, dto);

      expect(repo.exist).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
    });

    it('should NOT check email uniqueness when email is unchanged', async () => {
      const existing = buildMockUser();
      const dto: UpdateUserDto = { email: existing.email };

      repo.findOne.mockResolvedValue(existing);
      repo.save.mockImplementation((entity) => Promise.resolve(entity as User));

      await service.updateUser(mockUserId, dto);

      expect(repo.exist).not.toHaveBeenCalled();
    });

    it('should throw ConflictException when new email is already taken', async () => {
      const existing = buildMockUser();
      const dto: UpdateUserDto = { email: 'taken@example.com' };

      repo.findOne.mockResolvedValue(existing);
      repo.exist.mockResolvedValue(true);

      await expect(service.updateUser(mockUserId, dto)).rejects.toBeInstanceOf(
        ConflictException,
      );

      expect(repo.save).not.toHaveBeenCalled();
      expect(cache.clear).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when user does not exist', async () => {
      const dto: UpdateUserDto = { username: 'jane_doe' };
      repo.findOne.mockResolvedValue(null);

      await expect(service.updateUser(mockUserId, dto)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(repo.save).not.toHaveBeenCalled();
      expect(cache.clear).not.toHaveBeenCalled();
    });
  });

  describe('deleteUser', () => {
    it('should resolve and clear cache when a row was deleted', async () => {
      repo.delete.mockResolvedValue({ affected: 1, raw: [] } as DeleteResult);

      await expect(service.deleteUser(mockUserId)).resolves.toBeUndefined();

      expect(repo.delete).toHaveBeenCalledWith(mockUserId);
      expect(cache.clear).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when no row was affected', async () => {
      repo.delete.mockResolvedValue({ affected: 0, raw: [] } as DeleteResult);

      await expect(service.deleteUser(mockUserId)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(cache.clear).not.toHaveBeenCalled();
    });
  });

  describe('upsertFromClerk', () => {
    const buildUpsertDto = (): UpsertUserDto => ({
      clerkId: 'user_2abcXYZ',
      email: 'john@example.com',
      username: 'john_doe',
    });

    it('should update the existing user when one is found', async () => {
      const dto = buildUpsertDto();
      const existing = buildMockUser({ clerkId: null });

      repo.findOne.mockResolvedValue(existing);
      repo.save.mockImplementation((entity) => Promise.resolve(entity as User));

      const result = await service.upsertFromClerk(dto);

      expect(repo.findOne).toHaveBeenCalledWith({
        where: [{ clerkId: dto.clerkId }, { email: dto.email }],
      });
      expect(result).toMatchObject({
        id: mockUserId,
        clerkId: dto.clerkId,
        email: dto.email,
        username: dto.username,
      });
      expect(cache.clear).toHaveBeenCalledTimes(1);
    });

    it('should keep existing username when dto.username is empty', async () => {
      const dto: UpsertUserDto = {
        ...buildUpsertDto(),
        username: '',
      };
      const existing = buildMockUser({ username: 'original_username' });

      repo.findOne.mockResolvedValue(existing);
      repo.save.mockImplementation((entity) => Promise.resolve(entity as User));

      const result = await service.upsertFromClerk(dto);

      expect(result.username).toBe('original_username');
    });

    it('should create a new user when none is found', async () => {
      const dto = buildUpsertDto();
      const created = buildMockUser({
        clerkId: dto.clerkId,
        password: null,
      });

      repo.findOne.mockResolvedValue(null);
      repo.save.mockResolvedValue(created);

      await expect(service.upsertFromClerk(dto)).resolves.toEqual(created);

      expect(repo.save).toHaveBeenCalledWith({
        clerkId: dto.clerkId,
        email: dto.email,
        username: dto.username,
        password: null,
      });
      expect(cache.clear).toHaveBeenCalledTimes(1);
    });
  });
});
