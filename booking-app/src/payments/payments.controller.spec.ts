import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { User, UserRole } from '../users/user.entity';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let paymentsService: { createCheckoutSession: jest.Mock };

  const user = {
    id: 'u1111111-1111-1111-1111-111111111111',
    role: UserRole.User,
  } as User;

  const admin = {
    id: 'a1111111-1111-1111-1111-111111111111',
    role: UserRole.Admin,
  } as User;

  const bookingId = 'b1111111-1111-1111-1111-111111111111';

  beforeEach(async () => {
    paymentsService = {
      createCheckoutSession: jest.fn().mockResolvedValue({
        checkoutUrl: 'https://checkout.stripe.com/cs_test',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [{ provide: PaymentsService, useValue: paymentsService }],
    }).compile();

    controller = module.get(PaymentsController);
  });

  describe('createCheckoutSession', () => {
    it('throws UnauthorizedException when user is not authenticated', async () => {
      await expect(
        controller.createCheckoutSession(undefined, bookingId),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('calls service with isAdmin=false for a regular user', async () => {
      await controller.createCheckoutSession(user, bookingId);

      expect(paymentsService.createCheckoutSession).toHaveBeenCalledWith(
        bookingId,
        user.id,
        false,
      );
    });

    it('calls service with isAdmin=true for an admin user', async () => {
      await controller.createCheckoutSession(admin, bookingId);

      expect(paymentsService.createCheckoutSession).toHaveBeenCalledWith(
        bookingId,
        admin.id,
        true,
      );
    });

    it('returns the mapped checkout session DTO', async () => {
      const result = await controller.createCheckoutSession(user, bookingId);

      expect(result).toBeDefined();
    });
  });
});
