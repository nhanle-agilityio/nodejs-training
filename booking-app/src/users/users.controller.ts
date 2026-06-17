import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedResponseDto } from '../common/dto/unauthorized-response.dto';
import { Controller, Get } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './user.entity';

@Controller('users')
@ApiBearerAuth('clerk-jwt')
@ApiTags('users')
export class UsersController {
  @Get('me')
  @ApiOperation({
    summary: 'Get the current user profile',
    description:
      'Returns the profile of the authenticated user based on the Bearer token.',
  })
  @ApiOkResponse({
    description: 'Authenticated user profile',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: UnauthorizedResponseDto,
  })
  getCurrentUser(@CurrentUser() user: User): UserResponseDto {
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
