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
import { UpsertUserDto } from './upsert-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.usersRepo.find();
      return users;
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.usersRepo.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }

  async createUser(dto: CreateUserDto): Promise<User> {
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
      return newUser;
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
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
      return updatedUser;
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

  async upsertFromClerk(dto: UpsertUserDto): Promise<User> {
    const { clerkId, email, username } = dto;
    const existingUser = await this.usersRepo.findOne({
      where: [{ clerkId: clerkId }, { email: email }],
    });

    if (existingUser) {
      existingUser.clerkId = clerkId;
      existingUser.email = email;
      existingUser.username = username || existingUser.username;
      try {
        const updatedUser = await this.usersRepo.save(existingUser);
        return updatedUser;
      } catch (err) {
        throw new BadRequestException((err as Error).message);
      }
    }

    try {
      const user = await this.usersRepo.save({
        clerkId: clerkId,
        email: email,
        username: username,
        password: null,
      });
      return user;
    } catch (err) {
      throw new BadRequestException((err as Error).message);
    }
  }
}
