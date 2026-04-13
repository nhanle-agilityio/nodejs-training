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
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

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
  createUser(@Body() dto: CreateUserDto): Omit<User, 'password'> {
    return this.usersService.createUser(dto);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Omit<User, 'password'> {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    this.usersService.deleteUser(id);
  }
}
