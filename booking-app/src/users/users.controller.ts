import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';

@Controller('users')
@ApiBearerAuth('clerk-jwt')
@ApiTags('users')
export class UsersController {
  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
