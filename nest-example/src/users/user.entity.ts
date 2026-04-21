import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  Index,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @Index({ unique: true })
  clerkId: string | null;

  @Column({ type: 'varchar', length: 200 })
  username: string;

  @Column({ type: 'varchar', length: 200 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: true, select: false })
  password: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
