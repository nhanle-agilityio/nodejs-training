import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user_2abcXYZ', nullable: true })
  @Column({ type: 'varchar', length: 200, nullable: true })
  @Index({ unique: true })
  clerkId: string | null;

  @ApiProperty({ example: 'john_doe' })
  @Column({ type: 'varchar', length: 200 })
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  @Column({ type: 'varchar', length: 200 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: true, select: false })
  password: string | null;

  @ApiProperty({ type: String, format: 'date-time' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  @UpdateDateColumn()
  updatedAt: Date;
}
