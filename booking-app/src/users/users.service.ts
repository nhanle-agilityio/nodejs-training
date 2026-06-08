import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';

export interface UpsertFromClerkInput {
  clerkId: string;
  email: string;
  name: string;
  role: UserRole;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  findByClerkId(clerkId: string): Promise<User | null> {
    return this.users.findOne({ where: { clerkId } });
  }

  findById(id: string): Promise<User | null> {
    return this.users.findOne({ where: { id } });
  }

  async upsertFromClerk(input: UpsertFromClerkInput): Promise<User> {
    const existing = await this.users.findOne({
      where: { clerkId: input.clerkId },
    });

    if (existing) {
      existing.email = input.email;
      existing.name = input.name;
      existing.role = input.role;
      return this.users.save(existing);
    }

    const created = this.users.create({
      clerkId: input.clerkId,
      email: input.email,
      name: input.name,
      role: input.role,
    });

    return this.users.save(created);
  }

  async deleteByClerkId(clerkId: string): Promise<void> {
    await this.users.softDelete({ clerkId });
  }
}
