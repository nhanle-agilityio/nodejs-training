import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { randomUUID } from 'crypto';

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

  createUser(
    user: Pick<User, 'username' | 'email' | 'password'>,
  ): Omit<User, 'password'> {
    const existingUser = this.users.find((u: User) => u.email === user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const newUser: User = {
      id: randomUUID(),
      ...user,
    };
    this.users.push(newUser);

    const { id, username, email } = newUser;
    return { id, username, email };
  }

  updateUser(
    id: string,
    user: Partial<Pick<User, 'username' | 'email' | 'password'>>,
  ): Omit<User, 'password'> {
    const existingUser = this.users.find((u: User) => u.id === id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.email && existingUser.email !== user.email) {
      const emailValid = !this.users.find((u: User) => u.email === user.email);

      if (!emailValid) {
        throw new BadRequestException('Email already exists');
      }
    }
    const updatedUser: User = { ...existingUser, ...user };
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
