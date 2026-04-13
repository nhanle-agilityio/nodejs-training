import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      username: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    },
    {
      id: '2',
      username: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password',
    },
    {
      id: '3',
      username: 'Jim Doe',
      email: 'jim.doe@example.com',
      password: 'password',
    },
  ];

  getUsers(): Omit<User, 'password'>[] {
    return this.users.map(({ id, username, email }) => ({
      id,
      username,
      email,
    }));
  }

  getUserById(id: string): Omit<User, 'password'> {
    const user = this.users.find((user: User) => {
      if (user.id === id) {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
        };
      }
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  createUser(dto: CreateUserDto): Omit<User, 'password'> {
    const existingUser = this.users.find((u: User) => u.email === dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const newUser: User = {
      id: randomUUID(),
      username: dto.username,
      email: dto.email,
      password: dto.password,
    };
    this.users.push(newUser);

    const { id, username, email } = newUser;
    return { id, username, email };
  }

  updateUser(id: string, dto: UpdateUserDto): Omit<User, 'password'> {
    const existingUser = this.users.find((u: User) => u.id === id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (dto.email && existingUser.email !== dto.email) {
      const emailValid = !this.users.find((u: User) => u.email === dto.email);

      if (!emailValid) {
        throw new BadRequestException('Email already exists');
      }
    }
    const updatedUser: User = { ...existingUser, ...dto };
    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
    };
  }

  deleteUser(id: string): void {
    const index = this.users.findIndex((user: User) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
