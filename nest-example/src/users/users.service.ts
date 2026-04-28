import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UpsertUserDto } from './upsert-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  private async invalidateUsersCache(): Promise<void> {
    await this.cache.clear();
    this.logger.debug('Cache cleared after users mutation');
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const emailTaken = await this.usersRepo.exist({
      where: { email: dto.email },
    });
    if (emailTaken) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.usersRepo.save({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });
    await this.invalidateUsersCache();
    return newUser;
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
    const updatedUser = await this.usersRepo.save(existingUser);
    await this.invalidateUsersCache();
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.usersRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.invalidateUsersCache();
  }

  async upsertFromClerk(dto: UpsertUserDto): Promise<User> {
    const { clerkId, email, username } = dto;
    const existingUser = await this.usersRepo.findOne({
      where: [{ clerkId }, { email }],
    });

    if (existingUser) {
      existingUser.clerkId = clerkId;
      existingUser.email = email;
      existingUser.username = username || existingUser.username;
      const updatedUser = await this.usersRepo.save(existingUser);
      await this.invalidateUsersCache();
      return updatedUser;
    }

    const user = await this.usersRepo.save({
      clerkId,
      email,
      username,
      password: null,
    });
    await this.invalidateUsersCache();
    return user;
  }
}
