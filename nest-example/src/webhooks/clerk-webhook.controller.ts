import {
  BadRequestException,
  Controller,
  Headers,
  HttpCode,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { UpsertUserDto } from 'src/users/upsert-user.dto';
import { UsersService } from 'src/users/users.service';
import { Webhook } from 'svix';

type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string; id: string }>;
    primary_email_address_id?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
  };
};

@ApiExcludeController()
@Controller('webhooks/clerk')
export class ClerkWebhookController {
  private readonly logger = new Logger(ClerkWebhookController.name);
  private mapToUpsertUserDto(data: ClerkWebhookEvent['data']): UpsertUserDto {
    const { id, email_addresses, username, first_name, last_name } = data;
    const primaryEmail = email_addresses?.find(
      (email) => email.id === data.primary_email_address_id,
    )?.email_address;

    if (!primaryEmail) {
      throw new BadRequestException('Primary email address not found');
    }

    let generatedUsername = username;
    if (!username) {
      generatedUsername =
        first_name && last_name
          ? `${first_name} ${last_name}`
          : first_name || last_name;
    }

    return {
      clerkId: id,
      email: primaryEmail,
      username: generatedUsername || '',
    };
  }

  constructor(
    private readonly usersService: UsersService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @Post()
  @HttpCode(200)
  async handle(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('svix-id') svixId: string,
    @Headers('svix-timestamp') svixTimestamp: string,
    @Headers('svix-signature') svixSignature: string,
  ): Promise<{ received: true }> {
    const secret = this.config.get<string>('CLERK_WEBHOOK_SIGNING_SECRET');

    if (!secret) {
      throw new BadRequestException('Webhook signing secret not configured');
    }

    if (!req.rawBody) {
      throw new BadRequestException(
        'Raw body missing (enable rawBody in main.ts)',
      );
    }

    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new BadRequestException('Missing Svix headers');
    }

    let event: ClerkWebhookEvent;
    try {
      const wh = new Webhook(secret);
      event = wh.verify(req.rawBody, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as ClerkWebhookEvent;
    } catch (err) {
      this.logger.warn(`Invalid signature: ${(err as Error).message}`);
      throw new BadRequestException('Invalid webhook signature');
    }

    this.logger.log(`[clerk-webhook] ${event.type} (${event.data.id})`);

    switch (event.type) {
      case 'user.created':
      case 'user.updated':
        try {
          const upsertUserDto = this.mapToUpsertUserDto(event.data);
          await this.usersService.upsertFromClerk(upsertUserDto);
        } catch (err) {
          this.logger.error(`Error upserting user: ${(err as Error).message}`);
          throw new BadRequestException('Error upserting user');
        }
        break;
      default:
        this.logger.debug(`Unhandled event type: ${event.type}`);
    }
    return { received: true };
  }
}
