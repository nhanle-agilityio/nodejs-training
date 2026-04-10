import {
  Controller,
  Param,
  Get,
  Body,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import type { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Omit<User, 'password'>[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserDetails(@Param('id') id: string): Omit<User, 'password'> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(
    @Body() body: Pick<User, 'username' | 'email' | 'password'>,
  ): Omit<User, 'password'> {
    return this.usersService.createUser(body);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: Partial<Pick<User, 'username' | 'email' | 'password'>>,
  ): Omit<User, 'password'> {
    return this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    this.usersService.deleteUser(id);
  }
}
