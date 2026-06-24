import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Webhook } from 'svix';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { UsersService } from '../../users/users.service';
import { UserRole } from '../../users/user.entity';

jest.mock('svix', () => ({
  Webhook: jest.fn(),
}));

describe('ClerkWebhookController', () => {
  let controller: ClerkWebhookController;
  let users: { upsertFromClerk: jest.Mock; deleteByClerkId: jest.Mock };
  let mockVerify: jest.Mock;

  const svixId = 'msg_01';
  const svixTimestamp = '1700000000';
  const svixSignature = 'v1,signature_value';

  const makeRawReq = (body = '{}') => ({ rawBody: Buffer.from(body) });

  beforeEach(async () => {
    mockVerify = jest.fn();
    (Webhook as jest.Mock).mockImplementation(() => ({ verify: mockVerify }));

    users = {
      upsertFromClerk: jest.fn().mockResolvedValue(undefined),
      deleteByClerkId: jest.fn().mockResolvedValue(undefined),
    };

    const config = { get: jest.fn().mockReturnValue('whsec_test_secret') };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClerkWebhookController],
      providers: [
        { provide: UsersService, useValue: users },
        { provide: ConfigService, useValue: config },
      ],
    }).compile();

    controller = module.get(ClerkWebhookController);
  });

  describe('header validation', () => {
    it('throws BadRequestException when svix-id header is absent', async () => {
      await expect(
        controller.handle(
          makeRawReq() as never,
          undefined,
          svixTimestamp,
          svixSignature,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws BadRequestException when svix-timestamp header is absent', async () => {
      await expect(
        controller.handle(
          makeRawReq() as never,
          svixId,
          undefined,
          svixSignature,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws BadRequestException when svix-signature header is absent', async () => {
      await expect(
        controller.handle(
          makeRawReq() as never,
          svixId,
          svixTimestamp,
          undefined,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('throws BadRequestException when rawBody is absent', async () => {
      await expect(
        controller.handle(
          { rawBody: null } as never,
          svixId,
          svixTimestamp,
          svixSignature,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('signature verification', () => {
    it('throws BadRequestException when svix verify rejects the signature', async () => {
      mockVerify.mockImplementation(() => {
        throw new Error('bad signature');
      });

      await expect(
        controller.handle(
          makeRawReq() as never,
          svixId,
          svixTimestamp,
          svixSignature,
        ),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('user.created event', () => {
    it('calls upsertFromClerk with email resolved from primary_email_address_id', async () => {
      mockVerify.mockReturnValue({
        type: 'user.created',
        data: {
          id: 'clerk_1',
          email_addresses: [
            { id: 'em_secondary', email_address: 'other@test.com' },
            { id: 'em_primary', email_address: 'primary@test.com' },
          ],
          primary_email_address_id: 'em_primary',
          first_name: 'John',
          last_name: 'Doe',
          public_metadata: { role: UserRole.User },
        },
      });

      const result = await controller.handle(
        makeRawReq() as never,
        svixId,
        svixTimestamp,
        svixSignature,
      );

      expect(users.upsertFromClerk).toHaveBeenCalledWith({
        clerkId: 'clerk_1',
        email: 'primary@test.com',
        name: 'John Doe',
        role: UserRole.User,
      });
      expect(result).toEqual({ received: true, type: 'user.created' });
    });

    it('falls back to first email when primary_email_address_id is unset', async () => {
      mockVerify.mockReturnValue({
        type: 'user.created',
        data: {
          id: 'clerk_2',
          email_addresses: [{ id: 'em_1', email_address: 'first@test.com' }],
          primary_email_address_id: null,
          first_name: null,
          last_name: null,
          username: 'johndoe',
          public_metadata: {},
        },
      });

      await controller.handle(
        makeRawReq() as never,
        svixId,
        svixTimestamp,
        svixSignature,
      );

      expect(users.upsertFromClerk).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'first@test.com', name: 'johndoe' }),
      );
    });

    it('skips upsert and returns received when user has no email address', async () => {
      mockVerify.mockReturnValue({
        type: 'user.created',
        data: {
          id: 'clerk_3',
          email_addresses: [],
          primary_email_address_id: null,
        },
      });

      const result = await controller.handle(
        makeRawReq() as never,
        svixId,
        svixTimestamp,
        svixSignature,
      );

      expect(users.upsertFromClerk).not.toHaveBeenCalled();
      expect(result.received).toBe(true);
    });
  });

  describe('user.updated event', () => {
    it('calls upsertFromClerk with updated data', async () => {
      mockVerify.mockReturnValue({
        type: 'user.updated',
        data: {
          id: 'clerk_1',
          email_addresses: [{ id: 'em_1', email_address: 'updated@test.com' }],
          primary_email_address_id: 'em_1',
          first_name: 'Updated',
          last_name: null,
          public_metadata: {},
        },
      });

      const result = await controller.handle(
        makeRawReq() as never,
        svixId,
        svixTimestamp,
        svixSignature,
      );

      expect(users.upsertFromClerk).toHaveBeenCalledWith(
        expect.objectContaining({
          clerkId: 'clerk_1',
          email: 'updated@test.com',
          name: 'Updated',
        }),
      );
      expect(result).toEqual({ received: true, type: 'user.updated' });
    });
  });

  describe('user.deleted event', () => {
    it('calls deleteByClerkId with the user id', async () => {
      mockVerify.mockReturnValue({
        type: 'user.deleted',
        data: { id: 'clerk_1' },
      });

      const result = await controller.handle(
        makeRawReq() as never,
        svixId,
        svixTimestamp,
        svixSignature,
      );

      expect(users.deleteByClerkId).toHaveBeenCalledWith('clerk_1');
      expect(result).toEqual({ received: true, type: 'user.deleted' });
    });
  });
});
