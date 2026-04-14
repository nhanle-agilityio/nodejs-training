import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async getUsers(): Promise<Omit<User, 'password'>[]> {
    try {
      const users = await this.usersRepo.find({
        select: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
      });
      return users;
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }

  async getUserById(id: string): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.usersRepo.findOne({
        where: { id },
        select: ['id', 'username', 'email', 'createdAt', 'updatedAt'],
      });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }

  async createUser(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const emailTaken = await this.usersRepo.exist({
      where: { email: dto.email },
    });
    if (emailTaken) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUserData = {
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    };

    try {
      const newUser = await this.usersRepo.save(newUserData);
      return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }

  async updateUser(
    id: string,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersRepo.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (dto.email !== undefined && dto.email !== existingUser.email) {
      const emailTaken = await this.usersRepo.exist({
        where: { email: dto.email },
      });
      if (emailTaken) {
        throw new ConflictException('Email is already registered');
      }
    }

    Object.assign(existingUser, dto);

    try {
      const updatedUser = await this.usersRepo.save(existingUser);
      return {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      };
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
