import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService, UpsertFromClerkInput } from './users.service';
import { User, UserRole } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepo: jest.Mocked<
    Pick<Repository<User>, 'findOne' | 'save' | 'create' | 'softDelete'>
  >;

  const clerkId = 'clerk_user_1';
  const userId = 'u1111111-1111-1111-1111-111111111111';

  const existingUser = {
    id: userId,
    clerkId,
    email: 'old@test.com',
    name: 'Old Name',
    role: UserRole.User,
  } as User;

  beforeEach(async () => {
    usersRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      softDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: usersRepo },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  describe('findByClerkId', () => {
    it('delegates to repo.findOne with clerkId in the where clause', async () => {
      usersRepo.findOne.mockResolvedValue(existingUser);

      const result = await service.findByClerkId(clerkId);

      expect(usersRepo.findOne).toHaveBeenCalledWith({ where: { clerkId } });
      expect(result).toBe(existingUser);
    });

    it('returns null when user is not found', async () => {
      usersRepo.findOne.mockResolvedValue(null);

      const result = await service.findByClerkId('unknown');

      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('delegates to repo.findOne with id in the where clause', async () => {
      usersRepo.findOne.mockResolvedValue(existingUser);

      const result = await service.findById(userId);

      expect(usersRepo.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      expect(result).toBe(existingUser);
    });

    it('returns null when user is not found', async () => {
      usersRepo.findOne.mockResolvedValue(null);

      const result = await service.findById('unknown-id');

      expect(result).toBeNull();
    });
  });

  describe('upsertFromClerk', () => {
    it('updates email, name and role of an existing user', async () => {
      usersRepo.findOne.mockResolvedValue({ ...existingUser });
      usersRepo.save.mockImplementation((u) => Promise.resolve(u as User));

      const input: UpsertFromClerkInput = {
        clerkId,
        email: 'new@test.com',
        name: 'New Name',
        role: UserRole.User,
      };

      const result = await service.upsertFromClerk(input);

      expect(result.email).toBe('new@test.com');
      expect(result.name).toBe('New Name');
      expect(usersRepo.save).toHaveBeenCalled();
    });

    it('always overwrites existing role with the input role', async () => {
      const userWithAdminRole = { ...existingUser, role: UserRole.Admin };
      usersRepo.findOne.mockResolvedValue(userWithAdminRole);
      usersRepo.save.mockImplementation((u) => Promise.resolve(u as User));

      await service.upsertFromClerk({
        clerkId,
        email: 'x@x.com',
        name: 'X',
        role: UserRole.User,
      });

      expect(usersRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ role: UserRole.User }),
      );
    });

    it('updates role when input provides a new role for existing user', async () => {
      usersRepo.findOne.mockResolvedValue({
        ...existingUser,
        role: UserRole.User,
      });
      usersRepo.save.mockImplementation((u) => Promise.resolve(u as User));

      await service.upsertFromClerk({
        clerkId,
        email: 'x@x.com',
        name: 'X',
        role: UserRole.Admin,
      });

      expect(usersRepo.save).toHaveBeenCalledWith(
        expect.objectContaining({ role: UserRole.Admin }),
      );
    });

    it('creates a new user with the provided role', async () => {
      usersRepo.findOne.mockResolvedValue(null);
      const created = { ...existingUser, role: UserRole.User };
      usersRepo.create.mockReturnValue(created);
      usersRepo.save.mockResolvedValue(created);

      const result = await service.upsertFromClerk({
        clerkId: 'new_clerk_id',
        email: 'new@test.com',
        name: 'New User',
        role: UserRole.User,
      });

      expect(usersRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ role: UserRole.User }),
      );
      expect(usersRepo.save).toHaveBeenCalled();
      expect(result.role).toBe(UserRole.User);
    });

    it('creates new user with provided role when given', async () => {
      usersRepo.findOne.mockResolvedValue(null);
      const created = { ...existingUser, role: UserRole.Admin };
      usersRepo.create.mockReturnValue(created);
      usersRepo.save.mockResolvedValue(created);

      await service.upsertFromClerk({
        clerkId: 'new_clerk_id',
        email: 'admin@test.com',
        name: 'Admin User',
        role: UserRole.Admin,
      });

      expect(usersRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ role: UserRole.Admin }),
      );
    });
  });

  describe('deleteByClerkId', () => {
    it('calls softDelete with the clerkId', async () => {
      usersRepo.softDelete.mockResolvedValue({ affected: 1 } as never);

      await service.deleteByClerkId(clerkId);

      expect(usersRepo.softDelete).toHaveBeenCalledWith({ clerkId });
    });
  });
});
