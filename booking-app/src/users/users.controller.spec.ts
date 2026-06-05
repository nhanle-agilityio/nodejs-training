import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User, UserRole } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;

  const user = {
    id: 'u1111111-1111-1111-1111-111111111111',
    email: 'user@test.com',
    name: 'Test User',
    role: UserRole.User,
  } as User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get(UsersController);
  });

  describe('getCurrentUser', () => {
    it('returns a mapped UserResponseDto for the authenticated user', () => {
      const result = controller.getCurrentUser(user);

      expect(result).toMatchObject({ id: user.id, email: user.email });
    });
  });
});
