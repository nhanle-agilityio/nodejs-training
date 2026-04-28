import {
  Controller,
  Param,
  Get,
  Body,
  Post,
  Patch,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CorrelationId } from 'src/common/decorators/correlation-id.decorator';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth('clerk-jwt')
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @CacheTTL(30_000)
  @ApiOperation({ summary: 'Get all users (cached ~30s)' })
  @ApiResponse({
    status: 200,
    description: 'List of users returned',
    type: [User],
  })
  getUsers(@CorrelationId() correlationId?: string): Promise<User[]> {
    console.log('correlationId', correlationId);
    return this.usersService.getUsers();
  }

  @Get(':id')
  @CacheTTL(120_000) // 2 minutes — single item rarely changes
  @ApiOperation({ summary: 'Get user details by ID (cached ~2m)' })
  @ApiResponse({
    status: 200,
    description: 'User details returned',
    type: User,
  })
  getUserDetails(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user (invalidates list cache)' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(dto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user by ID (invalidates list + item cache)',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({
    summary: 'Delete user by ID (invalidates list + item cache)',
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
