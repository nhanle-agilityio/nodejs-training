import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Webhook } from 'svix';
import { Public } from '../../common/decorators/public.decorator';
import type { AppConfig } from '../../config/configuration';
import type { RawBodyRequest } from '../../common/types/raw-body-request';
import { UsersService } from '../../users/users.service';
import { UserRole } from '../../users/user.entity';

type ClerkEventType = 'user.created' | 'user.updated' | 'user.deleted';

interface ClerkUserData {
  id: string;
  email_addresses?: { id: string; email_address: string }[];
  primary_email_address_id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  public_metadata?: { role?: UserRole };
}

interface ClerkEvent {
  type: ClerkEventType;
  data: ClerkUserData;
}

@ApiExcludeController()
@SkipThrottle()
@Controller('webhooks/clerk')
export class ClerkWebhookController {
  private readonly logger = new Logger(ClerkWebhookController.name);

  constructor(
    private readonly users: UsersService,
    private readonly config: ConfigService<AppConfig, true>,
  ) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Req() req: RawBodyRequest,
    @Headers('svix-id') svixId: string | undefined,
    @Headers('svix-timestamp') svixTimestamp: string | undefined,
    @Headers('svix-signature') svixSignature: string | undefined,
  ): Promise<{ received: true; type: string }> {
    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new BadRequestException('Missing svix headers');
    }
    if (!req.rawBody) {
      throw new BadRequestException('Raw request body unavailable');
    }

    const secret = this.config.get('clerk.webhookSecret', { infer: true });
    const wh = new Webhook(secret);

    let event: ClerkEvent;
    try {
      event = wh.verify(req.rawBody.toString('utf8'), {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as ClerkEvent;
    } catch (err) {
      this.logger.warn(
        `Clerk webhook signature failed: ${(err as Error).message}`,
      );
      throw new BadRequestException('Invalid signature');
    }

    this.logger.log(`Clerk event ${event.type} for user ${event.data.id}`);

    switch (event.type) {
      case 'user.created':
      case 'user.updated': {
        const data = event.data;
        const email =
          data.email_addresses?.find(
            (e) => e.id === data.primary_email_address_id,
          )?.email_address ?? data.email_addresses?.[0]?.email_address;
        if (!email) {
          this.logger.warn(`Clerk user ${data.id} has no email — ignoring`);
          break;
        }
        const name =
          [data.first_name, data.last_name].filter(Boolean).join(' ') ||
          data.username ||
          '';
        let role = data.public_metadata?.role as UserRole;
        role = role ?? UserRole.User;

        await this.users.upsertFromClerk({
          clerkId: data.id,
          email,
          name,
          role,
        });
        break;
      }
      case 'user.deleted': {
        await this.users.deleteByClerkId(event.data.id);
        break;
      }
      default:
        this.logger.debug(`Unhandled Clerk event ${event.type as string}`);
    }

    return { received: true, type: event.type };
  }
}
