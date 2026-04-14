import {
  Controller,
  Param,
  Get,
  Body,
  Post,
  Patch,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserDetails(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return this.usersService.createUser(dto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
